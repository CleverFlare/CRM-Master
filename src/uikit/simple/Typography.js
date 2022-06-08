import TypographyStyles from "./css/typography.module.css";

const properTagNames = [
  "div",
  "span",
  "p",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "pre",
];

const Typography = ({ varient, element, weight, color, children }) => {
  const TagName = element
    ? properTagNames.includes(element.trim())
      ? element.trim()
      : "p"
    : "p";

  const styleVarient = varient
    ? Object.keys(TypographyStyles).includes(varient.trim())
      ? varient.trim()
      : "regular"
    : "regular";

  return (
    <TagName
      className={TypographyStyles[styleVarient]}
      style={{
        fontWeight: weight ? weight : "normal",
        color: color ? color : "inherit",
      }}
    >
      {children}
    </TagName>
  );
};

export default Typography;
