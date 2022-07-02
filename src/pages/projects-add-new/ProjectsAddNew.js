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

const ProjectsAddNew = () => {
  const sm = useMediaQuery("(min-width: 896px)");
  const fileRef = useRef();
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
        <input type="file" style={{ display: "none" }} ref={fileRef} />
        <Stack
          direction={sm ? "row" : "column"}
          alignItems={sm ? null : "center"}
          spacing={4}
          sx={{ width: "100%" }}
        >
          <Paper
            sx={{ width: "max-content", padding: 2, cursor: "pointer" }}
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
              />
              <TextField
                variant="standard"
                label="العنوان"
                placeholder="عنوان المشروع"
                sx={{ maxWidth: 600 }}
              />
            </Stack>
          </Paper>
        </Stack>
        <Button
          variant="contained"
          sx={{ minWidth: "max-content", width: sm ? 130 : "100%" }}
        >
          حفظ
        </Button>
      </Stack>
    </Wrapper>
  );
};

export default ProjectsAddNew;
