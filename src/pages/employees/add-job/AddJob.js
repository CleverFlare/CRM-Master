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

const AddJob = () => {
  const sm = useMediaQuery("(min-width: 896px)");
  const token = useSelector((state) => state.token.value);
  const domain = useSelector((state) => state.domain.value);
  const [name, setName] = useState("");
  const validate = useValidate();
  const [errors, setErrors] = useState({
    name: "",
  });
  const [error, setErorr] = useState("");
  const validation = [
    {
      name: "name",
      value: name,
      isRequired: true,
    },
  ];

  const handleSuccess = () => {
    setName("");
  };

  const [postRequest, errorAlert, successAlert] = usePost(
    "aqar/api/router/Job/",
    "وظيفة جديد تم إضافتها!",
    handleSuccess
  );

  const handleSubmit = () => {
    validate(validation).then((output) => {
      if (!output.ok) return setErrors(output.errors);
      const requestBody = {
        title: name,
        organization: 1,
      };
      postRequest(requestBody, "jobs");
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
            value={name}
            onChange={(event) => setName(event.target.value)}
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
      {/* <Snackbar
        open={Boolean(error)}
        autoHideDuration={1000}
        onClose={() => setErorr("")}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Alert severity="error" variant="filled" onClose={() => setErorr("")}>
          {error && error}
        </Alert>
      </Snackbar> */}
    </Wrapper>
  );
};

export default AddJob;
