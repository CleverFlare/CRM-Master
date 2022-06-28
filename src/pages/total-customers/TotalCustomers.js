import { DataGrid } from "@mui/x-data-grid";
import MenuIcon from "@mui/icons-material/Menu";
import { Container } from "@mui/system";
import Parameter from "../../components/parameter/Parameter";
import { Avatar, Box, Paper } from "@mui/material";

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

const TotalCustomers = () => {
  return (
    <div style={{ height: 697, direction: "ltr" }}>
      <Container sx={{ height: "100%" }}>
        <Box sx={{ direction: "ltr" }}>
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
        </Box>
        <Paper sx={{ height: "100%" }} elevation={2}>
          <DataGrid
            rows={rows}
            columns={columns}
            headerHeight={70}
            components={{
              ColumnMenuIcon: MenuIcon,
            }}
            sx={{
              "& .MuiDataGrid-row:not(.MuiDataGrid-row--dynamicHeight)>.MuiDataGrid-cell":
                {
                  direction: "ltr",
                },
              "& .MuiDataGrid-columnHeaderDraggableContainer": {
                direction: "ltr",
              },
              "& .MuiDataGrid-footerContainer": {
                display: "flex",
                justifyContent: "center",
              },
              "& .even": {
                bgcolor: "rgba(0, 0, 0, 0.08)",
              },
              "& .odd:hover": {
                bgcolor: "rgba(0, 0, 0, 0.02)",
              },
              "& .even:hover": {
                bgcolor: "rgba(0, 0, 0, 0.10)",
              },
            }}
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0 ? "odd" : "even"
            }
            hideFooterPagination
          />
        </Paper>
      </Container>
    </div>
  );
};

export default TotalCustomers;
