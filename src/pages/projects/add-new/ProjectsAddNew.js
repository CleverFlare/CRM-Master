import {
  Alert,
  Button,
  Paper,
  Snackbar,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Parameter from "../../../components/parameter/Parameter";
import Wrapper from "../../../components/wrapper/Wrapper";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useRef } from "react";
import { useState } from "react";
import { Box } from "@mui/system";
import ErrorPrompt from "../../../components/error-prompt/ErrorPrompt";
import { useSelector } from "react-redux";
import useControls from "../../../hooks/useControls";
import useValidate from "../../../hooks/useValidate";
import usePost from "../../../hooks/usePost";

const ProjectsAddNew = () => {
  const token = useSelector((state) => state.token.value);
  const domain = useSelector((state) => state.domain.value);
  const sm = useMediaQuery("(min-width: 896px)");
  const [controls, setControl, resetControls] = useControls({
    name: "",
    address: "",
    details: "",
    imageURL: "",
  });
  const handleSuccess = () => {
    resetControls();
  };
  const [postRequest, successAlert, errorAlert, isPending] = usePost(
    "aqar/api/router/Project/",
    "تمت إضافة مشروع جديد بنجاح!",
    handleSuccess
  );
  const { name, address, imageURL, details } = controls;
  const fileRef = useRef();
  const [errors, setErrors] = useState({});
  const validate = useValidate();

  const handlePost = (event) => {
    event.preventDefault();
    validate([
      {
        name: "name",
        value: name,
        isRequired: true,
      },
      {
        name: "address",
        value: address,
        isRequired: true,
      },
      {
        name: "details",
        value: details,
        isRequired: true,
      },
      {
        name: "imageURL",
        value: imageURL,
        isRequired: true,
      },
    ]).then((output) => {
      if (!output.ok) return setErrors(output.errors);
      setErrors(null);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("address", address);
      formData.append("comment", details);
      formData.append("logo", fileRef.current.files[0]);
      formData.append("organization", "1");
      postRequest(formData, false, "projects");
    });
  };

  const handleSetPicture = () => {
    const url = URL.createObjectURL(fileRef.current.files[0]);
    setControl("imageURL", url);
    console.log(url);
  };

  return (
    <Wrapper>
      <Parameter
        links={[
          {
            text: "المشاريع",
            path: "/",
          },
          {
            text: "إضافة مشروع جديد",
            path: "/",
          },
        ]}
      />
      <form onSubmit={handlePost}>
        <Stack
          sx={{
            maxWidth: "1000px",
            width: "100%",
          }}
          alignItems="center"
          spacing={4}
        >
          <input
            type="file"
            style={{ display: "none" }}
            ref={fileRef}
            onChange={handleSetPicture}
          />
          <Stack
            direction={sm ? "row" : "column"}
            alignItems={sm ? null : "center"}
            spacing={4}
            sx={{ width: "100%" }}
          >
            <Paper
              sx={{
                minWidth: "max-content",
                padding: 2,
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
                outline: errors?.imageURL ? "1px solid #ff000066" : "unset",
              }}
              onClick={() => fileRef.current.click()}
            >
              <Stack alignItems="center" sx={{ width: "max-content" }}>
                <AddPhotoAlternateIcon
                  color="primary"
                  sx={{ width: 100, height: 100 }}
                />
                <Typography variant="caption" color="primary">
                  اضف صورة المشروع هنا
                </Typography>
              </Stack>
              {imageURL && (
                <Box
                  sx={{
                    bgcolor: "white",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <img
                    src={imageURL && imageURL}
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                    onError={() => {
                      setControl("imageURL", "");
                    }}
                  />
                </Box>
              )}
            </Paper>
            <Paper
              sx={{
                padding: sm ? 2 : 0,
                width: "100%",
                boxSizing: "border-box",
                boxShadow: sm ? "inherit" : "none",
              }}
            >
              <Stack
                direction="column"
                justifyContent="space-between"
                spacing={2}
                sx={{ height: "100%" }}
              >
                <TextField
                  variant="standard"
                  label="اسم المشروع"
                  placeholder="اسم المشروع"
                  sx={{
                    maxWidth: 600,
                  }}
                  error={Boolean(errors?.name)}
                  helperText={errors?.name}
                  value={name}
                  onChange={(event) => setControl("name", event.target.value)}
                />
                <TextField
                  variant="standard"
                  label="العنوان"
                  placeholder="عنوان المشروع"
                  sx={{
                    maxWidth: 600,
                  }}
                  error={Boolean(errors?.address)}
                  helperText={errors?.address}
                  value={address}
                  onChange={(event) =>
                    setControl("address", event.target.value)
                  }
                />
                <TextField
                  variant="standard"
                  label="الفاصيل"
                  placeholder="الفاصيل"
                  multiline
                  rows={4}
                  value={details}
                  onChange={(event) =>
                    setControl("details", event.target.value)
                  }
                  error={Boolean(errors?.details)}
                  helperText={errors?.details}
                  sx={{
                    maxWidth: 600,
                  }}
                />
              </Stack>
            </Paper>
          </Stack>
          <Button
            variant="contained"
            type="submit"
            sx={{ minWidth: "max-content", width: sm ? 130 : "100%" }}
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

export default ProjectsAddNew;
