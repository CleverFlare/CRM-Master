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

const AddStatus = () => {
  const sm = useMediaQuery("(min-width: 896px)");
  const domain = useSelector((state) => state.domain.value);
  const token = useSelector((state) => state.token.value);
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");

  const handleSubmit = () => {
    fetch(domain + "aqar/api/router/Status/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        //prettier-ignore
        "Authorization": "Token " + token,
      },
      body: JSON.stringify({
        name,
        organization: 1,
      }),
    });
  };
  return (
    <Wrapper>
      <Parameter links={[{ text: "العملاء" }, { text: "إضافة حالة عميل" }]} />
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
      <Snackbar
        open={Boolean(error)}
        autoHideDuration={1000}
        onClose={() => setError("")}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Alert severity="error" variant="filled" onClose={() => setError("")}>
          {error && error}
        </Alert>
      </Snackbar>
    </Wrapper>
  );
};

export default AddStatus;
