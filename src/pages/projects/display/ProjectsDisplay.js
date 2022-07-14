import { Paper, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Parameter from "../../../components/parameter/Parameter";
import Project, { ProjectSkeleton } from "../../../components/project/Project";
import Wrapper from "../../../components/wrapper/Wrapper";

const ProjectSkeletonsStack = () => {
  return (
    <>
      <ProjectSkeleton />
      <ProjectSkeleton />
      <ProjectSkeleton />
      <ProjectSkeleton />
      <ProjectSkeleton />
    </>
  );
};

const ProjectsDisplay = () => {
  const token = useSelector((state) => state.token.value);
  const [projects, setProjects] = useState([]);
  const [isPending, setIsPending] = useState(true);
  useEffect(() => {
    fetch("http://137.184.58.193:8000/aqar/api/router/Project/", {
      method: "GET",
      headers: {
        //prettier-ignore
        "Authorization": "Token " + token,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        console.log(json);
        setProjects(json);
        setIsPending(false);
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
        {isPending && <ProjectSkeletonsStack />}
        {projects.length > 0 &&
          projects.map((project, index) => (
            <Project
              key={index}
              picture={project.logo}
              title={project.name}
              address={project.address}
              id={project.id}
            />
          ))}
        {projects.length <= 0 && !isPending && (
          <Stack
            justifyContent="center"
            alignItems="center"
            sx={{ width: "100%", flex: 1 }}
          >
            <Typography variant="h5" sx={{ color: "gray", fontWeight: "bold" }}>
              لا يوجد مشاريع
            </Typography>
          </Stack>
        )}
      </Stack>
    </Wrapper>
  );
};

export default ProjectsDisplay;
