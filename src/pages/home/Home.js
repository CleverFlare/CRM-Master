import Container from "@mui/material/Container";
import Parameter from "../../components/parameter/Parameter";
import Publisher from "../../components/publisher/Publisher";
import { Stack, Typography } from "@mui/material";
import Post from "../../components/post/Post";
import Wrapper from "../../components/wrapper/Wrapper";
import { useEffect, useState } from "react";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://137.184.58.193:8000/aqar/api/router/Post/", {
      method: "GET",
      headers: {
        //prettier-ignore
        "Authorization": "Token 4b0d32e62fab4bf53d1907ab69cf6b3a9583eca1",
      },
    })
      .then((res) => {
        if (!res.ok) throw Error("couldn't fetch the data for that resource");

        return res.json();
      })
      .then((json) => {
        console.log(json);
        setPosts([...json]);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div>
      <Wrapper sx={{ height: "100%" }}>
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
        <Stack spacing={2}>
          <Post name="احمد حاتم" date="2022-07-06T07:08:37.007914Z">
            تجربة
          </Post>
          {posts &&
            posts.map((post, index) => (
              <Post name={post.user} key={post.id} date={post.created_at}>
                {post.content}
              </Post>
            ))}
        </Stack>
      </Wrapper>
    </div>
  );
};

export default Home;
