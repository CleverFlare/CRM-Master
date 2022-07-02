import { Stack } from "@mui/material";
import Parameter from "../../components/parameter/Parameter";
import Project from "../../components/project/Project";
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
      <Stack spacing={4}>
        <Project
          picture="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          title={"مشروع الشيخ زايد & أكتوبر"}
          address={"اكتوبر غرب سوميد، مجاور 2، فيلا 10"}
        />
        <Project
          picture="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          title={"مشروع بس مش عارف اسميه ايه"}
          address={"بلا بلا بلا بلا"}
        />
      </Stack>
    </Wrapper>
  );
};

export default ProjectsDisplay;
