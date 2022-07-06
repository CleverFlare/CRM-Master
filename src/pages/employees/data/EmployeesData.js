import { IconButton, Paper, Stack } from "@mui/material";
import DataGrid from "../../../components/data-grid/DataGrid";
import Parameter from "../../../components/parameter/Parameter";
import Wrapper from "../../../components/wrapper/Wrapper";
import KeyIcon from "@mui/icons-material/Key";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BlockIcon from "@mui/icons-material/Block";
import { useState } from "react";
import { useEffect } from "react";

const dummyColumns = [
  {
    field: "name",
    headerName: "الأسم",
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
    field: "edit",
    headerName: "تعديل",
    customeContent: (params, editInfoSetter, editPassSetter, onEdit) => (
      <>
        <Stack direction="row" sx={{ width: 300 }} spacing={2}>
          <IconButton
            size="small"
            sx={{
              bgcolor: "#495f9b",
              color: "white",
              borderRadius: 2,
              "&:hover": {
                backgroundColor: "#5c77c1",
              },
            }}
            onClick={() => {
              editPassSetter(true);
            }}
          >
            <KeyIcon />
          </IconButton>
          <IconButton
            size="small"
            sx={{
              bgcolor: "#96ee9d",
              color: "white",
              borderRadius: 2,
              "&:hover": {
                backgroundColor: "#b2f1b7",
              },
            }}
            onClick={() => {
              editInfoSetter(true);
              onEdit({ ...params });
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            size="small"
            sx={{
              bgcolor: "#f8c6c6",
              color: "#ff3c3c",
              borderRadius: 2,
              "&:hover": {
                backgroundColor: "#ffe9e9",
              },
            }}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            size="small"
            sx={{
              bgcolor: "#ff3c3c",
              color: "white",
              borderRadius: 2,
              "&:hover": {
                backgroundColor: "#ff8080",
              },
            }}
          >
            <BlockIcon />
          </IconButton>
        </Stack>
      </>
    ),
  },
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
  const [employeesData, setEmployeesData] = useState(null);
  useEffect(() => {
    let convertToProperData = [];
    fetch("http://137.184.58.193:8000/aqar/api/router/Employee/", {
      method: "GET",
      headers: {
        //prettier-ignore
        "Authorization": "Token 4b0d32e62fab4bf53d1907ab69cf6b3a9583eca1",
      },
    })
      .then((res) => {
        if (!res.ok) throw Error("couldn't fetch data for that resource");

        return res.json();
      })
      .then((json) => {
        console.log(json);
        json.map((item) => {
          const employee = {
            name: item.user.first_name + " " + item.user.last_name,
            email: item.user.email,
            job: item.job,
          };
          convertToProperData.push(employee);
        });
        setEmployeesData(convertToProperData);
        console.log(convertToProperData);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return (
    <>
      <Wrapper>
        <Parameter
          links={[{ text: "الموظفين" }, { text: "بيانات الموظفين" }]}
        />
        <DataGrid
          rows={employeesData}
          columns={dummyColumns}
          nameWithSearch
          maxRowsPerPage={5}
        />
      </Wrapper>
    </>
  );
};

export default EmployeesData;
