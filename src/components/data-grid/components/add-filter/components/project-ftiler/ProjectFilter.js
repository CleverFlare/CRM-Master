import { MenuItem, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useGet from "../../../../../../hooks/useGet";

const ProjectFilter = ({ onFilter }) => {
  const projects = useSelector((state) => state.projects.value);
  const [getRequest, getRequestError] = useGet("aqar/api/router/Project/");
  const dispatch = useDispatch();
  const [value, setValue] = useState(
    Boolean(projects.length) ? projects[0].name : ""
  );
  useEffect(() => {
    if (Boolean(projects.length)) return;
    getRequest().then((res) => {
      dispatch({ type: "projects/set", payload: res.results });
    });
  }, []);

  useEffect(() => {
    onFilter(value);
  }, [value]);

  return (
    <Stack sx={{ paddingInline: 2, width: 200 }}>
      <TextField
        variant="standard"
        select
        value={value}
        onChange={(e) => setValue(e.target.value)}
      >
        {Boolean(projects.length) &&
          projects?.map((project, index) => (
            <MenuItem key={index} value={project.name}>
              <Typography>{project.name}</Typography>
            </MenuItem>
          ))}
      </TextField>
    </Stack>
  );
};

export default ProjectFilter;
