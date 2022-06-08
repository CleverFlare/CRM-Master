import Avatar from "../simple/Avatar";
import Button from "../simple/Button";
import "./css/postscreator.css";

const PostsCreator = () => {
  return (
    <div className="post-creator-wrapper">
      <div>
        <Avatar picture="https://i.pinimg.com/736x/25/1b/c1/251bc1f03f23cc865d6a21e83efc02f8.jpg" />
        <input
          type="text"
          placeholder="مالذي يدور في بالك؟"
          className="post-creator__input"
        />
      </div>
      <div>
        <Button style={{ width: "25%" }}>إضافة</Button>
      </div>
    </div>
  );
};

export default PostsCreator;
