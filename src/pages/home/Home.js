import Container from "@mui/material/Container";
import Parameter from "../../components/parameter/Parameter";
import Publisher from "../../components/publisher/Publisher";
import { Stack, Typography } from "@mui/material";
import Post, { PostSkeleton } from "../../components/post/Post";
import Wrapper from "../../components/wrapper/Wrapper";
import { useEffect, useState } from "react";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const skeletonNumber = Array(4).fill(0);

  useEffect(() => {
    fetch("http://137.184.58.193:8000/aqar/api/router/Post/", {
      method: "GET",
      headers: {
        //prettier-ignore
        "Authorization": "Token 94d7a586cefcf05c8242c6bb4537c4179aa30c37",
      },
    })
      .then((res) => {
        if (!res.ok) throw Error("couldn't fetch the data for that resource");

        return res.json();
      })
      .then((json) => {
        console.log(json);
        setPosts([...json]);
        setIsPending(false);
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
        <Publisher name="أحمد محمد" dataSetter={setPosts} />
        <Typography
          variant="h6"
          color="primary"
          sx={{ padding: "30px 0", fontWeight: "bold" }}
        >
          احدث المنشورات
        </Typography>
        <Stack spacing={2} sx={{ paddingBottom: "30px" }}>
          {isPending &&
            skeletonNumber.map((skeleton, index) => (
              <PostSkeleton key={index} />
            ))}
          {posts &&
            posts.map((post, index) => (
              <Post
                name={post.user}
                key={post.id}
                date={post.created_at}
                id={post.id}
              >
                {post.content}
              </Post>
            ))}
        </Stack>
      </Wrapper>
    </div>
  );
};

export default Home;
