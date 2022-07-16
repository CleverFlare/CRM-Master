import Parameter from "../../../components/parameter/Parameter";
import Wrapper from "../../../components/wrapper/Wrapper";

const AddJob = () => {
  return (
    <Wrapper>
      <Parameter links={[{ text: "عملاء" }, { text: "احصائيات العملاء" }]} />
    </Wrapper>
  );
};

export default AddJob;
