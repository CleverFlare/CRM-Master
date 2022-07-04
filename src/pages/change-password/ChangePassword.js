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

const ChangePassword = () => {
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
              />
              <Button type="submit" variant="contained">
                حفظ
              </Button>
            </Stack>
          </Stack>
        </form>
      </Wrapper>
    </>
  );
};

export default ChangePassword;
