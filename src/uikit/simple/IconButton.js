import IconButtonStyles from "./css/iconbutton.module.css";

const IconButton = ({ svg, size, color }) => {
  return (
    <button
      className={IconButtonStyles["button"]}
      style={{
        width: size ? size : "50px",
        height: size ? size : "50px",
        color: color ? color : "#000000",
      }}
    >
      {svg}
    </button>
  );
};

export default IconButton;
