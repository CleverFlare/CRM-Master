import {
  Alert,
  Button,
  Paper,
  Snackbar,
  Stack,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import Parameter from "../../../components/parameter/Parameter";
import Wrapper from "../../../components/wrapper/Wrapper";
import useControls from "../../../hooks/useControls";
import useGet from "../../../hooks/useGet";
import usePost from "../../../hooks/usePost";
import useValidate from "../../../hooks/useValidate";

const AddStatus = () => {
  const sm = useMediaQuery("(min-width: 896px)");
  const [controls, setControl, resetControls] = useControls({ name: "" });
  const [statusGetRequest, statusGetRequestError] = useGet(
    "aqar/api/router/Status/"
  );
  const validate = useValidate();
  const handleSuccess = () => {
    resetControls();
  };
  const [postRequest, successAlert, errorAlert, isPending] = usePost(
    "aqar/api/router/Status/",
    "تم إضافة حالة جديدة بنجاح!",
    handleSuccess
  );
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    validate([
      {
        name: "name",
        value: controls.name,
        isRequired: true,
      },
    ]).then((output) => {
      if (!output.ok) return setErrors(output.errors);
      setErrors(null);
      const requestBody = {
        name: controls.name,
        organization: 1,
      };
      postRequest(requestBody, true, "status");
    });
  };
  return (
    <Wrapper>
      <Parameter links={[{ text: "العملاء" }, { text: "إضافة حالة عميل" }]} />
      <form onSubmit={handleSubmit}>
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
              label="الحالة"
              placeholder="الحالة"
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
            type="submit"
            sx={{ maxWidth: 150, width: "100%", height: 45 }}
            disabled={isPending}
          >
            حفظ
          </Button>
        </Stack>
      </form>
      {successAlert}
      {errorAlert}
    </Wrapper>
  );
};

export default AddStatus;
