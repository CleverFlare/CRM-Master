// import { DataGrid } from "@mui/x-data-grid";
import MenuIcon from "@mui/icons-material/Menu";
import { Container } from "@mui/system";
import Parameter from "../../components/parameter/Parameter";
import { Avatar, Box, Paper } from "@mui/material";
import DataGrid from "../../components/data-grid/DataGrid";

const columns = [
  {
    field: "channel",
    headerName: "القناة",
    flex: 1,
    minWidth: 130,
  },
  {
    field: "saler",
    headerName: "مسؤول المبيعات",
    flex: 1,
    minWidth: 130,
  },
  {
    field: "comment",
    headerName: "تعليق",
    flex: 1,
    minWidth: 130,
  },
  {
    field: "project",
    headerName: "المشروع",
    flex: 1,
    minWidth: 130,
  },
  {
    field: "phone",
    headerName: "الهاتف",
    flex: 1,
    minWidth: 130,
  },
  {
    field: "name",
    headerName: "الأسم",
    flex: 1,
    minWidth: 130,
  },
];

const rows = [
  {
    id: 1,
    name: "محمد علي",
    phone: "01010203112",
    project: "الشيخ زايد & أكتوبر",
    comment: "لا يوجد",
    saler: "أحمد محمد",
    channel: "اليوتيوب",
  },
  {
    id: 2,
    name: "محمد علي",
    phone: "01010203112",
    project: "الشيخ زايد & أكتوبر",
    comment: "لا يوجد",
    saler: "أحمد محمد",
    channel: "اليوتيوب",
  },
  {
    id: 3,
    name: "محمد علي",
    phone: "01010203112",
    project: "الشيخ زايد & أكتوبر",
    comment: "لا يوجد",
    saler: "أحمد محمد",
    channel: "لايوجد",
  },
  {
    id: 4,
    name: "محمد علي",
    phone: "01010203112",
    project: "الشيخ زايد & أكتوبر",
    comment: "لا يوجد",
    saler: "أحمد محمد",
    channel: "لايوجد",
  },
  {
    id: 5,
    name: "محمد علي",
    phone: "01010203112",
    project: "الشيخ زايد & أكتوبر",
    comment: "لا يوجد",
    saler: "أحمد محمد",
    channel: "لايوجد",
  },
  {
    id: 6,
    name: "محمد علي",
    phone: "01010203112",
    project: "الشيخ زايد & أكتوبر",
    comment: "لا يوجد",
    saler: "أحمد محمد",
    channel: "لايوجد",
  },
  {
    id: 7,
    name: "محمد علي",
    phone: "01010203112",
    project: "الشيخ زايد & أكتوبر",
    comment: "لا يوجد",
    saler: "أحمد محمد",
    channel: "لايوجد",
  },
  {
    id: 8,
    name: "محمد علي",
    phone: "01010203112",
    project: "الشيخ زايد & أكتوبر",
    comment: "لا يوجد",
    saler: "أحمد محمد",
    channel: "لايوجد",
  },
  {
    id: 9,
    name: "محمد علي",
    phone: "01010203112",
    project: "الشيخ زايد & أكتوبر",
    comment: "لا يوجد",
    saler: "أحمد محمد",
    channel: "لايوجد",
  },
  {
    id: 10,
    name: "محمد علي",
    phone: "01010203112",
    project: "الشيخ زايد & أكتوبر",
    comment: "لا يوجد",
    saler: "أحمد محمد",
    channel: "لايوجد",
  },
  {
    id: 11,
    name: "محمد علي",
    phone: "01010203112",
    project: "الشيخ زايد & أكتوبر",
    comment: "لا يوجد",
    saler: "أحمد محمد",
    channel: "لايوجد",
  },
];

const dummyColumns = [
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

const TotalCustomers = () => {
  return (
    <div style={{ height: 697 }}>
      <Container sx={{ height: "100%" }}>
        <Parameter
          links={[
            {
              text: "العملاء",
              path: "#",
            },
            {
              text: "جميع العملاء",
              path: "/customers/total",
            },
          ]}
        />
        <DataGrid rows={dummyRows} columns={dummyColumns} />
      </Container>
    </div>
  );
};

export default TotalCustomers;
