import { TextField } from "@mui/material";
import { Container } from "@mui/system";
import Parameter from "../../components/parameter/Parameter";

const ChangePassword = () => {
  return (
    <>
      <Container>
        <Parameter
          links={[{ text: "الإعدادات" }, { text: "تعديل كلمة السر" }]}
        />
        <div>
          <TextField variant="standard" label="كلمة السر" />
        </div>
      </Container>
    </>
  );
};

export default ChangePassword;
