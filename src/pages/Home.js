import PostsCreator from "../uikit/complex/PostsCreator";
import Typography from "../uikit/simple/Typography";
import "./css/home.css";

const Home = () => {
  return (
    <div id="home">
      <Typography varient="medium" weight="bold" color="#233975">
        الرئيسية
      </Typography>
      <PostsCreator />
    </div>
  );
};

export default Home;
