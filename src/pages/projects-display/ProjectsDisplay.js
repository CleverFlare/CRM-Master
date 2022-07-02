import Parameter from "../../components/parameter/Parameter";
import Wrapper from "../../components/wrapper/Wrapper";

const ProjectsDisplay = () => {
  return (
    <Wrapper>
      <Parameter
        links={[
          {
            text: "المشاريع",
            path: "/",
          },
          {
            text: "عرض المشاريع",
            path: "/",
          },
        ]}
      />
    </Wrapper>
  );
};

export default ProjectsDisplay;
