import {
  Dialog,
  Button,
  Grow,
  Stack,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import usePatch from "../../hooks/usePatch";
import React from "react";
import useControls from "../../hooks/useControls";
import useValidate from "../../hooks/useValidate";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Grow direction="up" ref={ref} {...props} />;
});

const EditCustomerPassword = ({ isOpened, onClose, initials }) => {
  const [visibilities, setVisibilities] = useState({
    old: false,
    new: false,
    confirm: false,
  });
  const [controls, setControl, resetControls] = useControls({
    password: "",
    confirm: "",
  });
  const [errors, setErrors] = useState({});
  const [putRequest, putSuccessAlert, putErrorAlert, isPending] = usePatch(
    "aqar/api/router/Employee/",
    "تم تعديل الموظف بنجاح!",
    onClose
  );
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
        name: "password",
        value: controls.password,
        isRequired: true,
      },
      {
        name: "confirm",
        value: controls.confirm,
        isRequired: true,
        validation: [
          {
            regex: new RegExp(`${controls.password}`, ""),
            value: "رقم التأكيد لا يطابق الرقم السري",
          },
        ],
      },
    ]).then((output) => {
      setErrors(output.errors);
      if (!output.ok) return;
      const requestBody = {
        user: {
          password: controls.password,
        },
      };
      putRequest(requestBody, true, "employees", initials.id + "/").then(() => {
        resetControls();
      });
    });
  };

  return (
    <Dialog
      open={isOpened}
      onClose={onClose}
      TransitionComponent={Transition}
      sx={{
        "& .MuiDialog-paper": {
          bgcolor: (theme) => theme.palette.primary.main,
          color: "white",
          width: 550,
          height: 500,
          position: "relative",
        },
      }}
      BackdropProps={{
        sx: {
          bgcolor: "rgb(255 255 255 / 50%)",
        },
      }}
    >
      <IconButton
        sx={{ position: "absolute", top: "10px", left: "10px", color: "white" }}
        onClick={onClose}
      >
        <CancelOutlinedIcon color="error" />
      </IconButton>
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{ height: "100%" }}
      >
        <Stack
          justifyContent="center"
          alignItems="center"
          spacing={4}
          sx={{ width: "100%", maxWidth: 350 }}
        >
          <TextField
            type={visibilities.new ? "text" : "password"}
            variant="standard"
            label="الرقم السري الجديد"
            sx={{
              "& .MuiInputLabel-formControl": {
                fontSize: 20,
                fontWeight: "normal",
                transform: "translate(10px, -10.5px) scale(0.75)",
                color: "white",
              },
              "& .MuiInput-input": {
                paddingBlock: 1.2,
                fontSize: 15,
              },
              "& .MuiInputBase-formControl": {
                borderColor: "white",
                bgcolor: "white",
              },

              "& .MuiInputLabel-formControl.Mui-focused": {
                color: "unset",
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
            fullWidth
            value={controls.password}
            onChange={(e) => setControl("password", e.target.value)}
            error={Boolean(errors?.password)}
            helperText={errors?.password}
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
                color: "white",
              },
              "& .MuiInput-input": {
                paddingBlock: 1.2,
                fontSize: 15,
              },
              "& .MuiInputBase-formControl": {
                borderColor: "white",
                bgcolor: "white",
              },

              "& .MuiInputLabel-formControl.Mui-focused": {
                color: "unset",
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => handleVisibilityToggle("confirm")}>
                    {visibilities.confirm ? (
                      <VisibilityIcon color="primary" />
                    ) : (
                      <VisibilityOffIcon color="primary" />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            fullWidth
            value={controls.confirm}
            onChange={(e) => setControl("confirm", e.target.value)}
            error={Boolean(errors?.confirm)}
            helperText={errors?.confirm}
          />
          <Button
            type="submit"
            variant="outlined"
            sx={{
              borderColor: "white",
              color: "white",
              "&:hover": {
                borderColor: "white",
                color: "white",
              },
            }}
            fullWidth
            onClick={handleSubmit}
          >
            حفظ
          </Button>
        </Stack>
      </Stack>
      {putSuccessAlert}
      {putErrorAlert}
    </Dialog>
  );
};

export default EditCustomerPassword;
