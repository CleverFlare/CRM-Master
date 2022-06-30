import {
  Divider,
  FormControl,
  MenuItem,
  Input,
  InputLabel,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
  FormGroup,
  InputAdornment,
  ListItemText,
  ListItemIcon,
  ButtonGroup,
  Button,
  Menu,
  useMediaQuery,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Parameter from "../../components/parameter/Parameter";
import Wrapper from "../../components/wrapper/Wrapper";

const EmployeesAddNew = () => {
  const sm = useMediaQuery("(max-width:912px)");
  return (
    <>
      <Wrapper>
        <Parameter
          links={[
            {
              text: "الموظفين",
              path: "/",
            },
            {
              text: "إضافة موظف جديد",
              path: "/",
            },
          ]}
        />
        <Paper>
          <Stack sx={{ padding: 2, bgcolor: "#f8f8f9" }}>
            <Typography sx={{ fontWeight: "bold" }}>مرحبا بك!</Typography>
            <Typography>
              الرجاء ملئ المعلومات الآتية لاضافة عميل جديد
            </Typography>
          </Stack>
          <Divider orientation="horizontal" />
          <Stack direction="column" spacing={sm ? 2 : 5} sx={{ padding: 2 }}>
            <Stack
              direction={sm ? "column" : "row"}
              justifyContent="space-between"
              alignItems="center"
              spacing={sm ? 2 : 1}
            >
              <TextField
                variant="standard"
                label="الأسم"
                placeholder="الأسم"
                sx={{ width: sm ? "100%" : "770px" }}
                fullWidth={sm}
              />
              <TextField
                variant="standard"
                label="الهاتف"
                placeholder="الهاتف"
                sx={{ width: sm ? "100%" : "770px" }}
                fullWidth={sm}
              />
            </Stack>
            <Stack
              direction={sm ? "column" : "row"}
              justifyContent="space-between"
              alignItems="center"
              spacing={sm ? 2 : 1}
            >
              <TextField
                variant="standard"
                label="الوظيفة"
                placeholder="الوظيفة"
                sx={{ width: sm ? "100%" : "770px" }}
                fullWidth={sm}
              />
              <TextField
                variant="standard"
                label="البريد الإلكتروني"
                placeholder="البريد الإلكتروني"
                sx={{ width: sm ? "100%" : "770px" }}
                fullWidth={sm}
              />
            </Stack>
            <Stack
              direction={sm ? "column" : "row"}
              justifyContent="space-between"
              alignItems="center"
              spacing={sm ? 2 : 1}
            >
              <TextField
                variant="standard"
                label="الرقم السري"
                placeholder="الرقم السري"
                sx={{ width: sm ? "100%" : "770px" }}
                fullWidth={sm}
              />
              <TextField
                variant="standard"
                label="تأكيد الرقم السري"
                placeholder="تأكيد الرقم السري"
                sx={{ width: sm ? "100%" : "770px" }}
                fullWidth={sm}
              />
            </Stack>
          </Stack>
          <Stack
            direction="row"
            justifyContent="center"
            spacing={1}
            sx={{ padding: 2, bgcolor: "#fffaf3" }}
          >
            <Button variant="contained" color="primary">
              حفظ
            </Button>
            <Button variant="contained" color="error">
              الغاء
            </Button>
          </Stack>
        </Paper>
      </Wrapper>
    </>
  );
};

export default EmployeesAddNew;
