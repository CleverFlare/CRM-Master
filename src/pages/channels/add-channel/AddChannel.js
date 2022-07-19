import {
  Button,
  Collapse,
  Paper,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Box } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Parameter from "../../../components/parameter/Parameter";
import Wrapper from "../../../components/wrapper/Wrapper";
import useControls from "../../../hooks/useControls";
import useValidate from "../../../hooks/useValidate";
import usePost from "../../../hooks/usePost";

const AddChannel = () => {
  const sm = useMediaQuery("(min-width: 896px)");
  const [controls, setControl, resetControls] = useControls({
    name: "",
    imageLink: "",
    imageURl: "",
  });
  const { name, imageLink, imageURL } = controls;
  const [errors, setErrors] = useState({});
  const validate = useValidate();
  const handleSuccess = () => {
    resetControls();
  };
  const [postRequest, errorAlert, successAlert, isPending] = usePost(
    "aqar/api/router/Channel/",
    "قناة جديد تم إضافتها!",
    handleSuccess
  );
  const fileRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    const validation = [
      {
        name: "name",
        value: name,
        isRequired: true,
      },
      {
        name: "imageURL",
        value: imageURL,
        isRequired: true,
      },
    ];
    validate(validation).then((output) => {
      if (!output.ok) return setErrors(output.errors);
      const formData = new FormData();

      formData.append("name", name);
      formData.append("logo", fileRef.current.files[0]);
      formData.append("organization", "1");
      postRequest(formData, false, "channels");
    });
  };

  const handleSetPicture = () => {
    const url = URL.createObjectURL(fileRef.current.files[0]);
    setControl("imageURL", url);
  };

  const handleValidateImageURL = () => {
    if (imageLink.match(/\.(jpeg|jpg|gif|png)$/) != null) {
      return setControl("imageURL", imageLink);
    }
  };

  return (
    <Wrapper>
      <Parameter
        links={[
          {
            text: "القنوات",
            path: "/",
          },
          {
            text: "إضافة قناة",
            path: "/",
          },
        ]}
      />
      <form onSubmit={handleSubmit}>
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
            onChange={() => handleSetPicture()}
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
                border: Boolean(errors?.imageURL) ? "1px solid red" : "initial",
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
              {Boolean(imageURL) && (
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
                    src={imageURL}
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                    onError={() => {
                      setControl("imageLink", "");
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
                justifyContent={imageURL ? "center" : "space-between"}
                spacing={2}
                sx={{ height: "100%" }}
              >
                <TextField
                  variant="standard"
                  label="اسم القناة"
                  placeholder="اسم القناة"
                  sx={{ maxWidth: 600 }}
                  value={name}
                  onChange={(event) => setControl("name", event.target.value)}
                  error={Boolean(errors?.name)}
                  helperText={errors?.name}
                />
                <Collapse
                  in={!Boolean(imageURL)}
                  onExit={() => setControl("imageLink", "")}
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
                      setControl("imageLink", event.target.value);
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
            type="submit"
            sx={{ minWidth: "max-content", width: sm ? 130 : "100%" }}
            disabled={isPending}
          >
            حفظ
          </Button>
        </Stack>
        {errorAlert}
        {successAlert}
      </form>
    </Wrapper>
  );
};

export default AddChannel;
