import Container from "@mui/material/Container";
import Parameter from "../../components/parameter/Parameter";
import Publisher from "../../components/publisher/Publisher";
import { Stack, Typography } from "@mui/material";
import Post, { PostSkeleton } from "../../components/post/Post";
import Wrapper from "../../components/wrapper/Wrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const permissions = useSelector((state) => state.permissions.value);
  const postsStore = useSelector((state) => state.posts.value);
  const domain = useSelector((state) => state.domain.value);
  const dispatch = useDispatch();
  const [isPending, setIsPending] = useState(false);
  const skeletonNumber = Array(4).fill(0);
  const token = useSelector((state) => state.token.value);

  useEffect(() => {
    if (postsStore.length) return;
    setIsPending(true);
    fetch(domain + "aqar/api/router/Post/", {
      method: "GET",
      headers: {
        //prettier-ignore
        "Authorization": "Token " + token,
      },
    })
      .then((res) => {
        if (!res.ok) throw Error("couldn't fetch the data for that resource");

        return res.json();
      })
      .then((json) => {
        dispatch({ type: "posts/set", payload: json });
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
        {permissions?.includes("add_aqarpost") && (
          <Publisher name="أحمد محمد" />
        )}
        {permissions?.includes("view_aqarpost") && (
          <>
            <Typography
              variant="h6"
              color="primary"
              sx={{ padding: "30px 0", fontWeight: "bold" }}
            >
              احدث المنشورات
            </Typography>
            <Stack spacing={2} sx={{ paddingBottom: "30px" }}>
              {isPending &&
                skeletonNumber?.map((skeleton, index) => (
                  <PostSkeleton key={index} />
                ))}
              {Boolean(postsStore?.length) &&
                postsStore?.map((post, index) => (
                  <Post
                    name={post.user}
                    key={post.id}
                    date={post.created_at}
                    id={post.id}
                    imgs={post.medias}
                  >
                    {post.content}
                  </Post>
                ))}
              {!isPending && !postsStore?.length && (
                <Typography
                  variant="h5"
                  sx={{
                    color: "gray",
                    fontWeight: "bold",
                    pointerEvents: "none",
                  }}
                >
                  لا يوجد منشورات
                </Typography>
              )}
            </Stack>
          </>
        )}
      </Wrapper>
    </div>
  );
};

export default Home;
