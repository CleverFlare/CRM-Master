import {
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import Parameter from "../../components/parameter/Parameter";
import Wrapper from "../../components/wrapper/Wrapper";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import useControls from "../../hooks/useControls";
import useValidate from "../../hooks/useValidate";
import usePut from "../../hooks/usePut";
import { useDispatch } from "react-redux";

const ChangePassword = () => {
  const [visibilities, setVisibilities] = useState({
    old: false,
    new: false,
    confirm: false,
  });
  const [controls, setControl, resetControls] = useControls({
    old: "",
    new: "",
    confirm: "",
  });
  const [putReqest, successAlert, errorAlert, isPending] = usePut(
    "api/ChangePassword/",
    "تم تغيير الرقم السري بنجاح!"
  );
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const validate = useValidate();

  const handleVisibilityToggle = (which) => {
    const temp = visibilities;
    switch (which) {
      case "old":
        setVisibilities({ ...visibilities, old: !visibilities.old });
        break;
      case "new":
        setVisibilities({ ...visibilities, new: !visibilities.new });
        break;
        break;
      case "confirm":
        setVisibilities({ ...visibilities, confirm: !visibilities.confirm });
        break;
      default:
        setVisibilities(visibilities);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    validate([
      {
        name: "old",
        value: controls.old,
        isRequired: true,
      },
      {
        name: "new",
        value: controls.new,
        isRequired: true,
      },
      {
        name: "confirm",
        value: controls.confirm,
        isRequired: true,
        validation: [
          {
            regex: new RegExp(`${controls.new}`, ""),
            value: "رقم التأكيد لا يطابق الرقم السري الجديد",
          },
        ],
      },
    ]).then((output) => {
      setErrors(output.errors);
      if (!output.ok) return;
      const requestBody = {
        old_password: controls.old,
        new_password: controls.new,
        confirm_new_password: controls.confirm,
      };
      putReqest(requestBody, true).then((res) => {
        if (res !== null) {
          dispatch({ type: "token/remove" });
          dispatch({ type: "id/remove" });
        }
      });
    });
  };

  return (
    <>
      <Wrapper>
        <Parameter
          links={[{ text: "الإعدادات" }, { text: "تعديل كلمة السر" }]}
        />
        <form onSubmit={handleSubmit}>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ height: 500 }}
          >
            <Stack
              direction="column"
              justifyContent="center"
              sx={{ width: 350 }}
              spacing={3}
            >
              <TextField
                type={visibilities.old ? "text" : "password"}
                variant="standard"
                label="الرقم السري القديم"
                sx={{
                  "& .MuiInputLabel-formControl": {
                    fontSize: 20,
                    fontWeight: "normal",
                    transform: "translate(10px, -10.5px) scale(0.75)",
                    color: (theme) => theme.palette.primary.main,
                  },
                  "& .MuiInput-input": {
                    paddingBlock: 1.2,
                    fontSize: 15,
                  },
                  "& .MuiInputBase-formControl": {
                    borderColor: "#233975",
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      onClick={() => handleVisibilityToggle("old")}
                    >
                      <IconButton>
                        {visibilities.old ? (
                          <VisibilityIcon color="primary" />
                        ) : (
                          <VisibilityOffIcon color="primary" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                value={controls.old}
                onChange={(e) => setControl("old", e.target.value)}
                error={Boolean(errors?.old)}
                helperText={errors?.old}
              />
              <TextField
                type={visibilities.new ? "text" : "password"}
                variant="standard"
                label="الرقم السري الجديد"
                sx={{
                  "& .MuiInputLabel-formControl": {
                    fontSize: 20,
                    fontWeight: "normal",
                    transform: "translate(10px, -10.5px) scale(0.75)",
                    color: (theme) => theme.palette.primary.main,
                  },
                  "& .MuiInput-input": {
                    paddingBlock: 1.2,
                    fontSize: 15,
                  },
                  "& .MuiInputBase-formControl": {
                    borderColor: "#233975",
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => handleVisibilityToggle("new")}>
                        {visibilities.new ? (
                          <VisibilityIcon color="primary" />
                        ) : (
                          <VisibilityOffIcon color="primary" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                value={controls.new}
                onChange={(e) => setControl("new", e.target.value)}
                error={Boolean(errors?.new)}
                helperText={errors?.new}
              />
              <TextField
                type={visibilities.confirm ? "text" : "password"}
                variant="standard"
                label="تأكيد الرقم السري"
                sx={{
                  "& .MuiInputLabel-formControl": {
                    fontSize: 20,
                    fontWeight: "normal",
                    transform: "translate(10px, -10.5px) scale(0.75)",
                    color: (theme) => theme.palette.primary.main,
                  },
                  "& .MuiInput-input": {
                    paddingBlock: 1.2,
                    fontSize: 15,
                  },
                  "& .MuiInputBase-formControl": {
                    borderColor: "#233975",
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => handleVisibilityToggle("confirm")}
                      >
                        {visibilities.confirm ? (
                          <VisibilityIcon color="primary" />
                        ) : (
                          <VisibilityOffIcon color="primary" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                value={controls.confirm}
                onChange={(e) => setControl("confirm", e.target.value)}
                error={Boolean(errors?.confirm)}
                helperText={errors?.confirm}
              />
              <Button type="submit" variant="contained" disabled={isPending}>
                حفظ
              </Button>
            </Stack>
          </Stack>
        </form>
        {successAlert}
        {errorAlert}
      </Wrapper>
    </>
  );
};

export default ChangePassword;
