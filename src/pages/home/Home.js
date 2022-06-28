import Container from "@mui/material/Container";
import Parameter from "../../components/parameter/Parameter";
import Publisher from "../../components/publisher/Publisher";
import { Typography } from "@mui/material";
import Post from "../../components/post/Post";

const Home = () => {
  return (
    <div>
      <Container sx={{ height: "100%" }}>
        <Parameter
          links={[
            {
              text: "الرئيسية",
              path: "/",
            },
          ]}
        />
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
