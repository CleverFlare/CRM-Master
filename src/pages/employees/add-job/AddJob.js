import {
  Stack,
  Paper,
  TextField,
  useMediaQuery,
  Button,
  Alert,
  Snackbar,
} from "@mui/material";
import { useState } from "react";
import Parameter from "../../../components/parameter/Parameter";
import Wrapper from "../../../components/wrapper/Wrapper";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import useValidate from "../../../hooks/useValidate";
import usePost from "../../../hooks/usePost";
import useControls from "../../../hooks/useControls";

const AddJob = () => {
  const sm = useMediaQuery("(min-width: 896px)");
  const [errors, setErrors] = useState({});
  const validate = useValidate();
  const [controls, setControl, resetControls] = useControls({
    name: "",
  });

  const handleSuccess = () => {
    resetControls();
  };

  const [postRequest, errorAlert, successAlert] = usePost(
    "aqar/api/router/Job/",
    "وظيفة جديد تم إضافتها!",
    handleSuccess
  );

  const validation = [
    {
      name: "name",
      value: controls.name,
      isRequired: true,
    },
  ];

  const handleSubmit = () => {
    validate(validation).then((output) => {
      if (!output.ok) return setErrors(output.errors);
      const requestBody = {
        title: controls.name,
        organization: 1,
      };
      postRequest(requestBody, true, "jobs");
    });
  };
  return (
    <Wrapper>
      <Parameter links={[{ text: "الموظفين" }, { text: "إضافة وظيفة" }]} />
      <Stack
        sx={{
          maxWidth: "766px",
        }}
        justifyContent="center"
        alignItems="center"
        spacing={3}
      >
        <Paper
          sx={{
            padding: sm ? 2 : 0,
            width: "100%",
            boxSizing: "border-box",
            boxShadow: sm ? "inherit" : "none",
          }}
        >
          <TextField
            variant="standard"
            label="الوظيفة"
            placeholder="الوظيفة"
            sx={{
              width: "100%",
              maxWidth: 600,
            }}
            error={Boolean(errors?.name)}
            helperText={errors?.name}
            value={controls.name}
            onChange={(event) => setControl("name", event.target.value)}
          />
        </Paper>
        <Button
          variant="contained"
          sx={{ maxWidth: 150, width: "100%", height: 45 }}
          onClick={handleSubmit}
        >
          حفظ
        </Button>
      </Stack>
      {errorAlert}
      {successAlert}
    </Wrapper>
  );
};

export default AddJob;
