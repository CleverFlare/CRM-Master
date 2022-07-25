import { Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Parameter from "../../../components/parameter/Parameter";
import Project, { ProjectSkeleton } from "../../../components/project/Project";
import Wrapper from "../../../components/wrapper/Wrapper";
import useGet from "../../../hooks/useGet";

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
  const domain = useSelector((state) => state.domain.value);
  const projects = useSelector((state) => state.projects.value);
  const dispatch = useDispatch();
  const [projectsGetRequest, projectsGetRequestError] = useGet(
    "aqar/api/router/Project/"
  );
  const [isPending, setIsPending] = useState(false);
  useEffect(() => {
    if (Boolean(projects.length)) return;
    setIsPending(true);
    projectsGetRequest().then((res) => {
      dispatch({ type: "projects/set", payload: res.results });
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
        {Boolean(projects.length) &&
          projects?.map((project, index) => (
            <Project
              key={index}
              picture={project.logo}
              title={project.name}
              address={project.address}
              comment={project.comment}
              id={project.id}
            />
          ))}
        {Boolean(!projects.length) && !isPending && (
          <Stack
            justifyContent="center"
            alignItems="center"
            sx={{ width: "100%", flex: 1 }}
          >
            <Typography
              variant="h5"
              sx={{
                color: "gray",
                fontWeight: "bold",
                pointerEvents: "none",
              }}
            >
              لا يوجد مشاريع
            </Typography>
          </Stack>
        )}
      </Stack>
    </Wrapper>
  );
};

export default ProjectsDisplay;
