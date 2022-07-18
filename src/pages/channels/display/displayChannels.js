import Parameter from "../../../components/parameter/Parameter";
import Wrapper from "../../../components/wrapper/Wrapper";

const DisplayChannels = () => {
  return (
    <Wrapper>
      <Parameter links={[{ text: "القنوات" }, { text: "عرض القنوات" }]} />
    </Wrapper>
  );
};

export default DisplayChannels;
