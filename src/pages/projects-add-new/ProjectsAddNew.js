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

const ProjectsAddNew = () => {
  const sm = useMediaQuery("(min-width: 1244px)");
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
        <Stack
          direction={sm ? "row" : "column"}
          alignItems={sm ? null : "center"}
          spacing={4}
        >
          <Paper
            sx={{ width: "max-content", padding: 2, cursor: "pointer" }}
            onClick={() => console.log("clicked")}
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
              padding: 2,
              width: "100%",
              boxSizing: "border-box",
              paddingRight: 30,
            }}
          >
            <Stack
              direction="column"
              justifyContent="space-between"
              sx={{ height: "100%" }}
            >
              <TextField
                variant="standard"
                label="اسم المشروع"
                placeholder="اسم المشروع"
              />
              <TextField
                variant="standard"
                label="العنوان"
                placeholder="عنوان المشروع"
              />
            </Stack>
          </Paper>
        </Stack>
        <Button
          variant="contained"
          sx={{ minWidth: "max-content", width: 130 }}
        >
          حفظ
        </Button>
      </Stack>
    </Wrapper>
  );
};

export default ProjectsAddNew;
