import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Parameter from "../components/parameter/Parameter";
import Publisher from "../components/publisher/Publisher";
import { Typography } from "@mui/material";
import Post from "../components/post/Post";

const valueFormat = (params) => {
  return `${params.row.firstName || ""} ${params.row.lastName || ""}`;
};

const columns = [
  {
    field: "avatar",
    headerName: "الصورة الشخصية",
    align: "center",
    renderCell: (params) => (
      <Avatar sx={{ bgcolor: "orange" }}>{params.row.firstName[0]}</Avatar>
    ),
    width: 150,
  },
  {
    field: "firstName",
    headerName: "الأسم الأول",
    width: 130,
    type: "singleSelect",
    valueOptions: ["United Kingdom", "Spain", "Brazil"],
  },
  { field: "lastName", headerName: "الأسم الأخير", width: 130 },
  {
    field: "fullName",
    headerName: "الأسم الكامل",
    width: 200,
    valueGetter: valueFormat,
  },
];

const rows = [
  {
    id: 1,
    firstName: "محمد",
    lastName: "ماهر",
  },
  {
    id: 2,
    firstName: "محمود",
    lastName: "ماهر",
  },
];

const Home = () => {
  return (
    <div>
      <Container sx={{ height: "100%" }}>
        <Parameter path="الرئيسية" />
        <Publisher name="أحمد محمد" />
        <Typography
          variant="h6"
          color="primary"
          sx={{ padding: "30px 0", fontWeight: "bold" }}
        >
          احدث المنشورات
        </Typography>
        <Post name="أحمد مجدي">
          محتاج شقه متكرر فى الشيخ زايد بادجت 2 ونص كاش بحرى نص تشطيب
        </Post>
      </Container>
    </div>
  );
};

export default Home;
