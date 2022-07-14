// import { DataGrid } from "@mui/x-data-grid";
import MenuIcon from "@mui/icons-material/Menu";
import { Container } from "@mui/system";
import Parameter from "../../../components/parameter/Parameter";
import { Avatar, Box, Button, Checkbox, Paper, Stack } from "@mui/material";
import DataGrid from "../../../components/data-grid/DataGrid";
import Wrapper from "../../../components/wrapper/Wrapper";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const dummyColumns = [
  {
    field: "check",
    headerName: " ",
    customeContent: () => <Checkbox />,
  },
  {
    field: "name",
    headerName: "الأسم",
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
    headerName: "مسؤول المبيعات",
  },
  {
    field: "channel",
    headerName: "القناة",
  },
];

const dummyRows = [
  {
    name: "أ",
    phone: "01010203112",
    project: "الشيخ زايد & أكتوبر",
    comment: "لايوجد",
    saler: "أحمد محمد",
    channel: "اليوتيوب",
  },
  {
    name: "ت",
    phone: "01010203112",
    project: "الشيخ زايد & أكتوبر",
    comment: "لايوجد",
    saler: "أحمد محمد",
    channel: "لايوجد",
  },
  {
    name: "ج",
    phone: "01010203112",
    project: "الشيخ زايد & أكتوبر",
    comment: "لايوجد",
    saler: "أحمد محمد",
    channel: "لايوجد",
  },
  {
    name: "ث",
    phone: "01010203112",
    project: "الشيخ زايد & أكتوبر",
    comment: "لايوجد",
    saler: "أحمد محمد",
    channel: "لايوجد",
  },
  {
    name: "ب",
    phone: "01010203112",
    project: "الشيخ زايد & أكتوبر",
    comment: "لايوجد",
    saler: "أحمد محمد",
    channel: "اليوتيوب",
  },
  {
    name: "د",
    phone: "01010203112",
    project: "الشيخ زايد & أكتوبر",
    comment: "لايوجد",
    saler: "أحمد محمد",
    channel: "لايوجد",
  },
  {
    name: "ح",
    phone: "01010203112",
    project: "الشيخ زايد & أكتوبر",
    comment: "لايوجد",
    saler: "أحمد محمد",
    channel: "لايوجد",
  },
  {
    name: "ز",
    phone: "01010203112",
    project: "الشيخ زايد & أكتوبر",
    comment: "لايوجد",
    saler: "أحمد محمد",
    channel: "لايوجد",
  },
  {
    name: "خ",
    phone: "01010203112",
    project: "الشيخ زايد & أكتوبر",
    comment: "لايوجد",
    saler: "أحمد محمد",
    channel: "لايوجد",
  },
  {
    name: "ذ",
    phone: "01010203112",
    project: "الشيخ زايد & أكتوبر",
    comment: "لايوجد",
    saler: "أحمد محمد",
    channel: "لايوجد",
  },
  {
    name: "ر",
    phone: "01010203112",
    project: "الشيخ زايد & أكتوبر",
    comment: "لايوجد",
    saler: "أحمد محمد",
    channel: "لايوجد",
  },
];

const CustomersDeleted = () => {
  const token = useSelector((state) => state.token.value);
  useEffect(() => {
    fetch("http://137.184.58.193:8000/aqar/api/router/RestoreClient/", {
      method: "GET",
      headers: {
        //prettier-ignore
        "Authorization": "Token " + token,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        console.log(json);
      });
  }, []);
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
        <DataGrid rows={dummyRows} columns={dummyColumns} maxRowsPerPage={10} />
        <Stack
          sx={{ width: "100%", marginTop: "20px" }}
          justifyContent="center"
          alignItems="center"
        >
          <Button variant="contained">إسترجاع</Button>
        </Stack>
      </Wrapper>
    </div>
  );
};

export default CustomersDeleted;
