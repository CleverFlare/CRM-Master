import ButtonStyles from "./css/button.module.css";

const Button = ({ children, varient, style }) => {
  const varientStyle = Object.keys(ButtonStyles).includes(varient)
    ? varient
      ? varient.trim()
      : "primary"
    : "primary";

  return (
    <button className={ButtonStyles[varientStyle]} style={style}>
      {children}
    </button>
  );
};

export default Button;
