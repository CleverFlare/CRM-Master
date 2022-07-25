import { Breadcrumbs, Link } from "@mui/material";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";

const Parameter = ({ links }) => {
  return (
    <div style={{ padding: "20px 0" }}>
      <Breadcrumbs separator={<KeyboardDoubleArrowLeftIcon color="primary" />}>
        {links &&
          links?.map((item, index) => (
            <Link underline="none" color="primary.main" key={index}>
              {item.text}
            </Link>
          ))}
      </Breadcrumbs>
    </div>
  );
};

export default Parameter;
