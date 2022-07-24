import {
  Alert,
  Button,
  IconButton,
  InputAdornment,
  Snackbar,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useDispatch, useSelector } from "react-redux";
import useGet from "../../hooks/useGet";
import usePost from "../../hooks/usePost";
import useValidate from "../../hooks/useValidate";
import useControls from "../../hooks/useControls";

const Login = () => {
  const sm = useMediaQuery(`(max-width: 740px)`);
  const domain = useSelector((state) => state.domain.value);
  const [userInfoGetRequest, userInfoGetRequestError] = useGet(
    "aqar/api/router/UserInfo/"
  );
  const dispatch = useDispatch();
  const [visibilities, setVisibilities] = useState({
    password: false,
  });

  const [controls, setControl, resetControls] = useControls({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  // const [postRequest, successAlert, errorAlert, isPending] = usePost(
  //   "api/login/",
  //   "تم التسجيل بنجاح"
  // );
  const validate = useValidate();

  const handleSubmit = (event) => {
    event.preventDefault();
    validate([
      {
        name: "username",
        value: controls.username,
        isRequired: true,
      },
      {
        name: "password",
        value: controls.password,
        isRequired: true,
      },
    ]).then((output) => {
      setErrors(output.errors);
      if (!output.ok) return;
      const requestBody = {
        username: controls.username,
        password: controls.password,
      };
      fetch(domain + "api/login/", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })
        .then((res) => {
          if (!res.ok) {
            setError("couldn't login for some reason");
            throw Error("couldn't login for some reason");
          }
          return res.json();
        })
        .then((json) => {
          dispatch({ type: "token/set", payload: json.token });
          dispatch({ type: "id/set", payload: json.id });
          resetControls();
        })
        .catch((err) => {
          setError(`${err.message}`);
          console.log(err.message);
        });
    });
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        bgcolor: (theme) => theme.palette.primary.main,
      }}
    >
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{ width: "100%", height: "100%" }}
      >
        <Stack
          sx={{
            boxShadow: sm ? "none" : "0 0 10px 5px #fff5",
            height: sm ? "auto" : "80%",
            paddingInline: "50px",
          }}
          justifyContent="center"
          alignItems="center"
        >
          <form onSubmit={handleSubmit}>
            <Stack spacing={5}>
              <Stack justifyContent="center" alignItems="center">
                <Typography sx={{ color: "white" }} variant="h5">
                  تسجيل الدخول
                </Typography>
              </Stack>
              <TextField
                variant="standard"
                label="اسم المستخدم"
                value={controls.username}
                onChange={(e) => setControl("username", e.target.value)}
                error={Boolean(errors?.username)}
                helperText={errors?.username}
                sx={{
                  maxWidth: "400px",
                  width: "100vmax",
                  "& .MuiInputLabel-formControl": {
                    fontSize: 20,
                    fontWeight: "normal",
                    transform: "translate(10px, -10.5px) scale(0.75)",
                    color: "white !important",
                  },
                  "& .MuiInput-input": {
                    paddingBlock: 1.2,
                    fontSize: 15,
                  },
                  "& .MuiInputBase-formControl": {
                    borderColor: "white",
                    bgcolor: "white",
                    color: "black",
                  },
                }}
              />
              <TextField
                type={visibilities.password ? "text" : "password"}
                variant="standard"
                label="الرقم السري القديم"
                sx={{
                  maxWidth: "400px",
                  width: "100vmax",
                  "& .MuiInputLabel-formControl": {
                    fontSize: 20,
                    fontWeight: "normal",
                    transform: "translate(10px, -10.5px) scale(0.75)",
                    color: "white !important",
                  },
                  "& .MuiInput-input": {
                    paddingBlock: 1.2,
                    fontSize: 15,
                  },
                  "& .MuiInputBase-formControl": {
                    borderColor: "white",
                    bgcolor: "white",
                    color: "black",
                  },
                }}
                value={controls.password}
                onChange={(e) => setControl("password", e.target.value)}
                error={Boolean(errors?.password)}
                helperText={errors?.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      onClick={() =>
                        setVisibilities((old) => ({
                          ...old,
                          password: !old.password,
                        }))
                      }
                    >
                      <IconButton>
                        {visibilities.password ? (
                          <VisibilityIcon color="primary" />
                        ) : (
                          <VisibilityOffIcon color="primary" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                variant="outlined"
                sx={{
                  color: "white",
                  borderColor: "white",
                  paddingBlock: "10px",
                  "&:hover": { borderColor: "white" },
                }}
              >
                تسجيل الدخول
              </Button>
            </Stack>
          </form>
          <Snackbar
            open={Boolean(error)}
            autoHideDuration={1000}
            onClose={() => setError("")}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            <Alert
              severity="error"
              variant="filled"
              onClose={() => setError("")}
            >
              {error && error}
            </Alert>
          </Snackbar>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Login;
