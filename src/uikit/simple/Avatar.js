import AvatarStyles from "./css/avatar.module.css";

const Avatar = ({ name, picture, size, color }) => {
  let fontColor = "#000000";

  const colorCondition = color
    ? color[0] === "#"
      ? color
      : "#ffa500"
    : "#ffa500";

  if (
    color &&
    color[0] === "#" &&
    (color[1] + color[2]) * 0.299 +
      (color[3] + color[4] * 0.587) +
      (color[5] + color[6] * 0.114) >
      186
  ) {
    fontColor = "#000000";
  } else {
    fontColor = "#ffffff";
  }

  return (
    <div
      className={AvatarStyles["avatar-wrapper"]}
      style={{
        width: size ? size : "50px",
        height: size ? size : "50px",
        backgroundColor: [colorCondition],
      }}
    >
      {!picture && (
        <p style={{ color: fontColor }}>{name ? name.toUpperCase()[0] : "A"}</p>
      )}
      {picture && <img src={picture} />}
    </div>
  );
};

export default Avatar;
