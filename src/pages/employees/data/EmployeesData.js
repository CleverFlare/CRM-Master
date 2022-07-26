import { Avatar, IconButton, Paper, Stack, Typography } from "@mui/material";
import DataGrid from "../../../components/data-grid/DataGrid";
import Parameter from "../../../components/parameter/Parameter";
import Wrapper from "../../../components/wrapper/Wrapper";
import KeyIcon from "@mui/icons-material/Key";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BlockIcon from "@mui/icons-material/Block";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useGet from "../../../hooks/useGet";
import useDelete from "../../../hooks/useDelete";
import CustomersEditDialog from "../../../components/customers-edit-dialog/CustomersEditDialog";
import { GridRowEditStartReasons } from "@mui/x-data-grid";
import EditCustomerPassword from "../../../components/edit-customer-password/EditCustomerPassword";
import usePagination from "../../../hooks/usePagination";

const dummyColumns = [
  {
    field: "name",
    headerName: "الأسم",
    customeContent: (params) => (
      <Stack direction="row" alignItems="center" spacing={2}>
        <Avatar sx={{ height: "34px", width: "34px" }} src={params.picture} />
        <Typography>{params.name}</Typography>
      </Stack>
    ),
  },
  {
    field: "email",
    headerName: "البريد الإلكتروني",
  },
  {
    field: "job",
    headerName: "الوظيفة",
  },
  {
    field: "username",
    headerName: "اسم المستخدم",
  },
  // {
  //   field: "edit",
  //   headerName: "تعديل",
  //   customeContent: (params, editInfoSetter, editPassSetter, onEdit) => (
  //     <>
  //       <Stack direction="row" sx={{ width: 300 }} spacing={2}>
  //         <IconButton
  //           size="small"
  //           sx={{
  //             bgcolor: "#495f9b",
  //             color: "white",
  //             borderRadius: 2,
  //             "&:hover": {
  //               backgroundColor: "#5c77c1",
  //             },
  //           }}
  //           onClick={() => {
  //             editPassSetter(true);
  //           }}
  //         >
  //           <KeyIcon />
  //         </IconButton>
  //         <IconButton
  //           size="small"
  //           sx={{
  //             bgcolor: "#96ee9d",
  //             color: "white",
  //             borderRadius: 2,
  //             "&:hover": {
  //               backgroundColor: "#b2f1b7",
  //             },
  //           }}
  //           onClick={() => {
  //             editInfoSetter(true);
  //             onEdit({ ...params });
  //           }}
  //         >
  //           <EditIcon />
  //         </IconButton>
  //         <IconButton
  //           size="small"
  //           sx={{
  //             bgcolor: "#f8c6c6",
  //             color: "#ff3c3c",
  //             borderRadius: 2,
  //             "&:hover": {
  //               backgroundColor: "#ffe9e9",
  //             },
  //           }}
  //         >
  //           <DeleteIcon />
  //         </IconButton>
  //         <IconButton
  //           size="small"
  //           sx={{
  //             bgcolor: "#ff3c3c",
  //             color: "white",
  //             borderRadius: 2,
  //             "&:hover": {
  //               backgroundColor: "#ff8080",
  //             },
  //           }}
  //         >
  //           <BlockIcon />
  //         </IconButton>
  //       </Stack>
  //     </>
  //   ),
  // },
];

const dummyRows = [
  {
    name: "احمد علي",
    email: "mohammadali@gmail.com",
    job: "مندوب مبيعات",
  },
  {
    name: "محمد علي",
    email: "mohammadali@gmail.com",
    job: "مندوب مبيعات",
  },
  {
    name: "محمد علي",
    email: "mohammadali@gmail.com",
    job: "مندوب مبيعات",
  },
  {
    name: "محمد علي",
    email: "mohammadali@gmail.com",
    job: "مندوب مبيعات",
  },
  {
    name: "محمد علي",
    email: "mohammadali@gmail.com",
    job: "مندوب مبيعات",
  },
  {
    name: "محمد علي",
    email: "mohammadali@gmail.com",
    job: "مندوب مبيعات",
  },
  {
    name: "محمد علي",
    email: "mohammadali@gmail.com",
    job: "مندوب مبيعات",
  },
  {
    name: "محمد علي",
    email: "mohammadali@gmail.com",
    job: "مندوب مبيعات",
  },
];

const EmployeesData = () => {
  const permissions = useSelector((state) => state.permissions.value);
  const employees = useSelector((state) => state.employees.value);
  const storeUsername = useSelector((state) => state.userInfo.value.username);
  const [isEditedOpened, setIsEditOpened] = useState(false);
  const [editInitials, setEditInitials] = useState({
    name: "الأسم",
    email: "بريد",
    job: "وظيفة",
    id: 0,
  });
  const [isEditPassOpened, setIsEditPassOpened] = useState(false);
  const [current, limit, isPending, onNext, onPrev] = usePagination(
    "aqar/api/router/Employee/",
    { storeValuesToDispatch: "employees" }
  );
  const dispatch = useDispatch();
  const [employeeGetRequest, employeeGetRequestError] = useGet(
    "aqar/api/router/Employee/"
  );
  const [deleteRequest, deleteSuccessAlert, deleteErrorAlert] = useDelete(
    "aqar/api/router/Employee/"
  );

  const parseToProperData = (array) => {
    let newArray = [];
    array?.map((item) => {
      const employee = {
        username: item?.user?.username,
        name: item.user?.first_name + " " + item.user?.last_name,
        email: item.user?.email,
        job: item?.job,
        id: item?.id,
        picture: item?.user?.image,
        permissions: item?.user?.user_permissions?.map(
          (permission) => permission.codename
        ),
      };
      newArray.push(employee);
    });
    return newArray;
  };

  useEffect(() => {
    employeeGetRequest().then((res) => {
      dispatch({ type: "employees/set", payload: res.results });
    });
  }, []);

  const handleDelete = (e, rowData) => {
    deleteRequest("employees", rowData.id);
  };
  return (
    <>
      <Wrapper>
        <Parameter
          links={[{ text: "الموظفين" }, { text: "بيانات الموظفين" }]}
        />
        <DataGrid
          current={current}
          max={limit}
          onNext={onNext}
          onPrev={onPrev}
          isPending={isPending}
          rows={
            Boolean(employees?.length)
              ? parseToProperData(employees).filter(
                  (employee) => employee.username !== storeUsername
                )
              : []
          }
          columns={dummyColumns}
          nameWithSearch
          maxRowsPerPage={10}
          onEdit={
            permissions?.includes("change_aqaremployee")
              ? (e, rowData) => {
                  setIsEditOpened(true);
                  setEditInitials({
                    name: rowData.name,
                    job: rowData.job,
                    email: rowData.email,
                    id: rowData.id,
                    perms: rowData.permissions,
                  });
                }
              : null
          }
          onDelete={
            permissions?.includes("delete_aqaremployee") ? handleDelete : null
          }
          onChangePassword={
            permissions?.includes("change_aqaremployee")
              ? (e, rowData) => {
                  setEditInitials({
                    id: rowData.id,
                  });
                  setIsEditPassOpened(true);
                }
              : null
          }
          onBlock={() => {
            console.log("block");
          }}
        />
        {deleteSuccessAlert}
        {deleteErrorAlert}
        <CustomersEditDialog
          isOpened={isEditedOpened}
          onClose={() => setIsEditOpened(false)}
          initials={editInitials}
        />
        <EditCustomerPassword
          isOpened={isEditPassOpened}
          onClose={() => setIsEditPassOpened(false)}
          initials={{ id: editInitials.id }}
        />
      </Wrapper>
    </>
  );
};

export default EmployeesData;
