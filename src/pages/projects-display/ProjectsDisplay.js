import { Paper, Stack } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import Parameter from "../../components/parameter/Parameter";
import Project, { ProjectSkeleton } from "../../components/project/Project";
import Wrapper from "../../components/wrapper/Wrapper";

const ProjectSkeletonsStack = () => {
  return (
    <>
      <ProjectSkeleton />
      <ProjectSkeleton />
      <ProjectSkeleton />
      <ProjectSkeleton />
      <ProjectSkeleton />
      <ProjectSkeleton />
      <ProjectSkeleton />
    </>
  );
};

const ProjectsDisplay = () => {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    fetch("http://137.184.58.193:8000/aqar/api/router/Project/", {
      method: "GET",
      headers: {
        //prettier-ignore
        "Authorization": "Token 4b0d32e62fab4bf53d1907ab69cf6b3a9583eca1",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        console.log(json);
        setProjects(json);
      });
  }, []);
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
        {projects.length <= 0 && <ProjectSkeletonsStack />}
        {projects.length > 0 &&
          // <>
          //   <Project
          //     picture="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          //     title={"مشروع الشيخ زايد & أكتوبر"}
          //     address={"اكتوبر غرب سوميد، مجاور 2، فيلا 10"}
          //   />
          //   <Project
          //     picture="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          //     title={"مشروع بس مش عارف اسميه ايه"}
          //     address={"بلا بلا بلا بلا"}
          //   />
          // </>
          projects.map((project, index) => (
            <Project
              key={index}
              picture={project.logo}
              title={project.name}
              address={project.address}
              id={project.id}
            />
          ))}
      </Stack>
    </Wrapper>
  );
};

export default ProjectsDisplay;
