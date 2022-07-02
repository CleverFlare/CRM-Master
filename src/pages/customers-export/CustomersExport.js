import { Stack } from "@mui/material";
import Parameter from "../../components/parameter/Parameter";
import Wrapper from "../../components/wrapper/Wrapper";
import DropBox from "../../components/drop-box/DropBox";

const CustomersExport = () => {
  return (
    <>
      <Wrapper>
        <Parameter
          links={[
            {
              text: "العملاء",
              path: "/",
            },
            {
              text: "إستيراد عملاء",
              path: "/",
            },
          ]}
        />
        <Stack alignItems="center">
          <DropBox variant="upload" />
        </Stack>
      </Wrapper>
    </>
  );
};

export default CustomersExport;
