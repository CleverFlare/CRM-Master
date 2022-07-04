import MenuIcon from "@mui/icons-material/Menu";
import { Container } from "@mui/system";
import Parameter from "../../components/parameter/Parameter";
import { Avatar, Box, Paper } from "@mui/material";
import DataGrid from "../../components/data-grid/DataGrid";
import Wrapper from "../../components/wrapper/Wrapper";

const dummyColumns = [
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
    name: "ب",
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
    channel: "اليوتيوب",
  },
  {
    name: "ث",
    phone: "01010203112",
    project: "الشيخ زايد & أكتوبر",
    comment: "لايوجد",
    saler: "أحمد محمد",
    channel: "اليوتيوب",
  },
  {
    name: "ج",
    phone: "01010203112",
    project: "الشيخ زايد & أكتوبر",
    comment: "لايوجد",
    saler: "أحمد محمد",
    channel: "اليوتيوب",
  },
  {
    name: "ح",

    phone: "01010203112",
    project: "الشيخ زايد & أكتوبر",
    comment: "لايوجد",
    saler: "أحمد محمد",
    channel: "اليوتيوب",
  },
  {
    name: "خ",
    phone: "01010203112",
    project: "الشيخ زايد & أكتوبر",
    comment: "لايوجد",
    saler: "أحمد محمد",
    channel: "اليوتيوب",
  },
  {
    name: "خ",
    phone: "01010203112",
    project: "الشيخ زايد & أكتوبر",
    comment: "لايوجد",
    saler: "أحمد محمد",
    channel: "اليوتيوب",
  },
  {
    name: "خ",
    phone: "01010203112",
    project: "الشيخ زايد & أكتوبر",
    comment: "لايوجد",
    saler: "أحمد محمد",
    channel: "اليوتيوب",
  },
  {
    name: "خ",
    phone: "01010203112",
    project: "الشيخ زايد & أكتوبر",
    comment: "لايوجد",
    saler: "أحمد محمد",
    channel: "اليوتيوب",
  },
  {
    name: "خ",
    phone: "01010203112",
    project: "الشيخ زايد & أكتوبر",
    comment: "لايوجد",
    saler: "أحمد محمد",
    channel: "اليوتيوب",
  },
  {
    name: "خ",
    phone: "01010203112",
    project: "الشيخ زايد & أكتوبر",
    comment: "لايوجد",
    saler: "أحمد محمد",
    channel: "اليوتيوب",
  },
  {
    name: "خ",
    phone: "01010203112",
    project: "الشيخ زايد & أكتوبر",
    comment: "لايوجد",
    saler: "أحمد محمد",
    channel: "اليوتيوب",
  },
  {
    name: "خ",
    phone: "01010203112",
    project: "الشيخ زايد & أكتوبر",
    comment: "لايوجد",
    saler: "أحمد محمد",
    channel: "اليوتيوب",
  },
  {
    name: "خ",
    phone: "01010203112",
    project: "الشيخ زايد & أكتوبر",
    comment: "لايوجد",
    saler: "أحمد محمد",
    channel: "اليوتيوب",
  },
  {
    name: "خ",
    phone: "01010203112",
    project: "الشيخ زايد & أكتوبر",
    comment: "لايوجد",
    saler: "أحمد محمد",
    channel: "اليوتيوب",
  },
  {
    name: "خ",
    phone: "01010203112",
    project: "الشيخ زايد & أكتوبر",
    comment: "لايوجد",
    saler: "أحمد محمد",
    channel: "اليوتيوب",
  },
];

const TotalCustomers = () => {
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
              text: "جميع العملاء",
              path: "/customers/total",
            },
          ]}
        />
        <DataGrid rows={dummyRows} columns={dummyColumns} maxRowsPerPage={10} />
      </Wrapper>
    </div>
  );
};

export default TotalCustomers;
