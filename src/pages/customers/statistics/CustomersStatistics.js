import { Stack } from "@mui/material";
import Parameter from "../../../components/parameter/Parameter";
import Wrapper from "../../../components/wrapper/Wrapper";

const CustomersStatistics = () => {
  return (
    <Wrapper>
      <Parameter links={[{ text: "عملاء" }, { text: "احصائيات العملاء" }]} />
      <Stack></Stack>
    </Wrapper>
  );
};

export default CustomersStatistics;
