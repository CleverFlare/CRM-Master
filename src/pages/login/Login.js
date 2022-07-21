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

const Login = () => {
  const sm = useMediaQuery(`(max-width: 740px)`);
  const domain = useSelector((state) => state.domain.value);
  const dispatch = useDispatch();
  const [visibilities, setVisibilities] = useState({
    password: false,
  });

  const [controls, setControls] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
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
        setControls({
          username: "",
          password: "",
        });
        setError("an error occured");
        if (!res.ok) throw Error("couldn't login for some reason");
        return res.json();
      })
      .then((json) => {
        console.log(json);
        dispatch({ type: "token/set", payload: json.token });
        dispatch({ type: "id/set", payload: json.id });
      })
      .catch((err) => {
        setControls({
          username: "",
          password: "",
        });
        setError(`${err.message}`);
        console.log(err.message);
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
                onChange={(e) =>
                  setControls((old) => ({ ...old, username: e.target.value }))
                }
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
                onChange={(e) =>
                  setControls((old) => ({ ...old, password: e.target.value }))
                }
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
