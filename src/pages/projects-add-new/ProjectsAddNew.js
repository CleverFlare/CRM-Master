import {
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Parameter from "../../components/parameter/Parameter";
import Wrapper from "../../components/wrapper/Wrapper";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useRef } from "react";
import { useState } from "react";
import { Box } from "@mui/system";

const ProjectsAddNew = () => {
  const sm = useMediaQuery("(min-width: 896px)");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const fileRef = useRef();
  const [imageURl, setImageURL] = useState("");

  const handlePost = (event) => {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("address", address);
    formData.append("logo", fileRef.current.files[0]);
    formData.append("organization", "1");

    fetch("http://137.184.58.193:8000/aqar/api/router/Project/", {
      method: "POST",
      headers: {
        //prettier-ignore
        "Authorization": "Token 4b0d32e62fab4bf53d1907ab69cf6b3a9583eca1",
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
                sx={{ maxWidth: 600 }}
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
              <TextField
                variant="standard"
                label="العنوان"
                placeholder="عنوان المشروع"
                sx={{ maxWidth: 600 }}
                value={address}
                onChange={(event) => setAddress(event.target.value)}
              />
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
