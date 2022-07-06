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
import React from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Grow direction="up" ref={ref} {...props} />;
});

const EditCustomerPassword = ({ isOpened, onClose }) => {
  const [visibilities, setVisibilities] = useState({
    old: false,
    new: false,
    confirm: false,
  });

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
            type={visibilities.old ? "text" : "password"}
            variant="standard"
            label="الرقم السري القديم"
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
            fullWidth
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
          >
            حفظ
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default EditCustomerPassword;
