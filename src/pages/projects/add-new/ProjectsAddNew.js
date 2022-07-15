import {
  Button,
  Paper,
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

const ProjectsAddNew = () => {
  const token = useSelector((state) => state.token.value);
  const domain = useSelector((state) => state.domain.value);
  const sm = useMediaQuery("(min-width: 896px)");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const fileRef = useRef();
  const [imageURl, setImageURL] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({
    name: false,
    address: false,
    image: false,
  });
  const openPrompt = Boolean(errorMessage);

  const handleCheckForErrors = () => {
    setErrors({
      name: false,
      address: false,
      image: false,
    });
    setErrorMessage("");
    if (!name || !address || !fileRef.current.files[0]) {
      setErrorMessage("الرجاء ملئ جميع الخانات");
    }
    if (!name) {
      setErrors((oldObject) => ({ ...oldObject, name: true }));
    }
    if (!address) {
      setErrors((oldObject) => ({ ...oldObject, address: true }));
    }
    if (!fileRef.current.files[0]) {
      setErrors((oldObject) => ({ ...oldObject, image: true }));
    }
    return;
  };

  const handlePost = (event) => {
    handleCheckForErrors();
    if (errorMessage) return;
    const formData = new FormData();

    formData.append("name", name);
    formData.append("address", address);
    formData.append("logo", fileRef.current.files[0]);
    formData.append("organization", "1");

    fetch(domain + "aqar/api/router/Project/", {
      method: "POST",
      headers: {
        //prettier-ignore
        "Authorization": "Token " + token,
      },
      body: formData,
    });
  };

  const handleSetPicture = () => {
    const url = URL.createObjectURL(fileRef.current.files[0]);
    setImageURL(url);
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
              outline: errors.image ? "1px solid #ff000066" : "unset",
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
            {imageURl && (
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
                  src={imageURl && imageURl}
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                  onError={() => {
                    setImageURL("");
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
                  "& .MuiInputBase-formControl": {
                    borderColor: errors.name ? "#ff000066" : "#00000021",
                  },
                }}
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
              <TextField
                variant="standard"
                label="العنوان"
                placeholder="عنوان المشروع"
                sx={{
                  maxWidth: 600,
                  "& .MuiInputBase-formControl": {
                    borderColor: errors.address ? "#ff000066" : "#00000021",
                  },
                }}
                value={address}
                onChange={(event) => setAddress(event.target.value)}
              />

              <ErrorPrompt
                open={openPrompt}
                onClose={() => setErrorMessage("")}
                // sx={{ maxWidth: 600 }}
              >
                {errorMessage}
              </ErrorPrompt>
            </Stack>
          </Paper>
        </Stack>
        <Button
          variant="contained"
          sx={{ minWidth: "max-content", width: sm ? 130 : "100%" }}
          onClick={handlePost}
        >
          حفظ
        </Button>
      </Stack>
    </Wrapper>
  );
};

export default ProjectsAddNew;
