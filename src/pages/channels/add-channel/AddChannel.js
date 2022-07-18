import {
  Button,
  Collapse,
  Paper,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Parameter from "../../components/parameter/Parameter";
import Wrapper from "../../components/wrapper/Wrapper";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Box } from "@mui/system";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";

const AddChannel = () => {
  const sm = useMediaQuery("(min-width: 896px)");
  const token = useSelector((state) => state.token.value);
  const domain = useSelector((state) => state.domain.value);
  const [name, setName] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [imageURl, setImageURL] = useState("");
  const fileRef = useRef();

  const handlePost = (event) => {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("logo", fileRef.current.files[0]);
    formData.append("organization", "1");

    fetch(domain + "aqar/api/router/Channel/", {
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

  const handleValidateImageURL = () => {
    if (imageLink.match(/\.(jpeg|jpg|gif|png)$/) != null) {
      return setImageURL(imageLink);
    }
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
                اضف صورة القناة هنا
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
              justifyContent={imageURl ? "center" : "space-between"}
              spacing={2}
              sx={{ height: "100%" }}
            >
              <TextField
                variant="standard"
                label="اسم القناة"
                placeholder="اسم القناة"
                sx={{ maxWidth: 600 }}
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
              <Collapse
                in={!imageURl}
                onExit={() => setImageLink("")}
                sx={{ maxWidth: 600 }}
                unmountOnExit
              >
                <TextField
                  variant="standard"
                  label="رابط صورة القناة"
                  placeholder="رابط صورة القناة"
                  sx={{ width: "100%" }}
                  value={imageLink}
                  onChange={(event) => {
                    setImageLink(event.target.value);
                  }}
                  onKeyUp={() => {
                    handleValidateImageURL();
                  }}
                  onPaste={() => {
                    handleValidateImageURL();
                  }}
                />
              </Collapse>
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

export default AddChannel;
