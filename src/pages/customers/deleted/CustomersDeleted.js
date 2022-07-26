// import { DataGrid } from "@mui/x-data-grid";
import MenuIcon from "@mui/icons-material/Menu";
import { Container } from "@mui/system";
import Parameter from "../../../components/parameter/Parameter";
import { Avatar, Box, Button, Checkbox, Paper, Stack } from "@mui/material";
import DataGrid from "../../../components/data-grid/DataGrid";
import Wrapper from "../../../components/wrapper/Wrapper";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import usePost from "../../../hooks/usePost";
import useDelete from "../../../hooks/useDelete";
import useGet from "../../../hooks/useGet";
import usePagination from "../../../hooks/usePagination";

const dummyRows = [
  {
    name: "أ",
    phone: "01010203112",
    project: "الشيخ زايد & أكتوبر",
    comment: "لايوجد",
    saler: "أحمد محمد",
    channel: "اليوتيوب",
    id: 1,
  },
  {
    name: "ت",
    phone: "01010203112",
    project: "الشيخ زايد & أكتوبر",
    comment: "لايوجد",
    saler: "أحمد محمد",
    channel: "لايوجد",
    id: 2,
  },
  {
    name: "ج",
    phone: "01010203112",
    project: "الشيخ زايد & أكتوبر",
    comment: "لايوجد",
    saler: "أحمد محمد",
    channel: "لايوجد",
    id: 3,
  },
  {
    name: "ث",
    phone: "01010203112",
    project: "الشيخ زايد & أكتوبر",
    comment: "لايوجد",
    saler: "أحمد محمد",
    channel: "لايوجد",
    id: 4,
  },
  {
    name: "ب",
    phone: "01010203112",
    project: "الشيخ زايد & أكتوبر",
    comment: "لايوجد",
    saler: "أحمد محمد",
    channel: "اليوتيوب",
    id: 5,
  },
  {
    name: "د",
    phone: "01010203112",
    project: "الشيخ زايد & أكتوبر",
    comment: "لايوجد",
    saler: "أحمد محمد",
    channel: "لايوجد",
    id: 6,
  },
  {
    name: "ح",
    phone: "01010203112",
    project: "الشيخ زايد & أكتوبر",
    comment: "لايوجد",
    saler: "أحمد محمد",
    channel: "لايوجد",
    id: 7,
  },
  {
    name: "ز",
    phone: "01010203112",
    project: "الشيخ زايد & أكتوبر",
    comment: "لايوجد",
    saler: "أحمد محمد",
    channel: "لايوجد",
    id: 8,
  },
  {
    name: "خ",
    phone: "01010203112",
    project: "الشيخ زايد & أكتوبر",
    comment: "لايوجد",
    saler: "أحمد محمد",
    channel: "لايوجد",
    id: 9,
  },
  {
    name: "ذ",
    phone: "01010203112",
    project: "الشيخ زايد & أكتوبر",
    comment: "لايوجد",
    saler: "أحمد محمد",
    channel: "لايوجد",
    id: 10,
  },
  {
    name: "ر",
    phone: "01010203112",
    project: "الشيخ زايد & أكتوبر",
    comment: "لايوجد",
    saler: "أحمد محمد",
    channel: "لايوجد",
    id: 11,
  },
];

const CustomersDeleted = () => {
  const [current, limit, isPending, onNext, onPrev] = usePagination(
    "aqar/api/router/RestoreClient/",
    { storeValuesToDispatch: "deletedCustomers" }
  );
  const [customersGetRequest, customersGetRequestError] = useGet(
    "aqar/api/router/RestoreClient/"
  );
  const [restoreRequest, restoreSuccessAlert, restoreErrorAlert] = usePost(
    "aqar/api/router/RestoreClient/",
    "تم إسترجاع العملاء بنجاح"
  );
  // const [deleteRequest, deleteSuccessAlert, deleteErrorAlert] = useDelete(
  //   "aqar/api/router/RestoreClient/",
  //   "تم حذف العملاء بنجاح"
  // );
  const deletedCustomers = useSelector((state) => state.deletedCustomers.value);

  const parseToProperData = (json) => {
    let parentArray = [];
    json?.map((item, index) => {
      const customer = {
        name: item.user.first_name + " " + item.user.last_name,
        phone: item.user.phone,
        project: Boolean(item.bussiness.length)
          ? item.bussiness.join(", ")
          : "لا يوجد",
        comment: "لايوجد",
        saler: item.agent.name,
        channel: item.channel,
        id: item.id,
        allData: item,
      };
      parentArray.push(customer);
    });
    return parentArray;
  };

  const dispatch = useDispatch();
  const [selected, setSelected] = useState([]);
  useEffect(() => {
    // if (Boolean(deletedCustomers?.length)) return;
    customersGetRequest().then((res) => {
      dispatch({ type: "deletedCustomers/set", payload: res.results });
    });
  }, []);

  const handleRestore = () => {
    const requestBody = {
      organization: 1,
      id: selected,
    };
    restoreRequest(requestBody, true, [
      { path: "aqar/api/router/RestoreClient/", name: "deletedCustomers" },
      { path: "aqar/api/router/Client/", name: "allCustomers" },
    ]);
  };

  const handleCheckboxChange = (e, id) => {
    if (e.target.checked) {
      setSelected((old) => [...old, id]);
    } else {
      setSelected((old) => [...old.filter((item) => item !== id)]);
    }
  };

  const dummyColumns = [
    {
      field: "check",
      headerName: " ",
      customeContent: (params) => {
        return (
          <Checkbox onChange={(e) => handleCheckboxChange(e, params.id)} />
        );
      },
    },
    {
      field: "name",
      headerName: "الاسم",
    },
    {
      field: "phone",
      headerName: "الهاتف",
    },
    {
      field: "project",
      headerName: "المشروع",
    },
    {
      field: "comment",
      headerName: "تعليق",
    },
    {
      field: "saler",
      headerName: "موظف",
    },
    {
      field: "channel",
      headerName: "القناة",
    },
  ];

  return (
    <div style={{ height: 697 }}>
      <Wrapper sx={{ height: "100%" }}>
        <Parameter
          links={[
            {
              text: "العملاء",
              path: "#",
            },
            {
              text: "العملاء المحذوفة",
              path: "/customers/total",
            },
          ]}
        />
        <DataGrid
          rows={
            Boolean(deletedCustomers?.length)
              ? parseToProperData(deletedCustomers)
              : null
          }
          columns={dummyColumns}
          maxRowsPerPage={10}
          current={current}
          max={limit}
          onNext={onNext}
          onPrev={onPrev}
          isPending={isPending}
        />
        <Stack
          sx={{ width: "100%", marginTop: "20px" }}
          justifyContent="center"
          alignItems="center"
        >
          <Button
            variant="contained"
            sx={{ marginBlock: 2 }}
            onClick={handleRestore}
          >
            إسترجاع
          </Button>
        </Stack>
        {restoreSuccessAlert}
        {restoreErrorAlert}
      </Wrapper>
    </div>
  );
};

export default CustomersDeleted;
