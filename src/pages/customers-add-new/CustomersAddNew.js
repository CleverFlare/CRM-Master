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
  FormLabel,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Parameter from "../../components/parameter/Parameter";
import Wrapper from "../../components/wrapper/Wrapper";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TelegramIcon from "@mui/icons-material/Telegram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CancelIcon from "@mui/icons-material/Cancel";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useState } from "react";
import { Box } from "@mui/system";

const countries = [
  {
    code: "(+20)",
    flag: (
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Flag_of_Egypt.svg/2560px-Flag_of_Egypt.svg.png"
        style={{ maxWidth: 20 }}
      />
    ),
  },
  {
    code: "(+1)",
    flag: (
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Flag_of_the_United_States_%28Pantone%29.svg/800px-Flag_of_the_United_States_%28Pantone%29.svg.png?20160113211754"
        style={{ maxWidth: 20 }}
      />
    ),
  },
];

const salers = [
  "أحمد محمد",
  "أحمد محمد",
  "أحمد محمد",
  "أحمد محمد",
  "أحمد محمد",
];

const selectChannels = [
  {
    name: "youtube",
    arabic: "قناة اليوتيوب",
    icon: <YouTubeIcon sx={{ color: "red" }} />,
  },
  {
    name: "facebook",
    arabic: "قناة الفيسبوك",
    icon: <FacebookIcon sx={{ color: "purple" }} />,
  },
  {
    name: "telegram",
    arabic: "قناة التيليجرام",
    icon: <TelegramIcon sx={{ color: "skyblue" }} />,
  },
  {
    name: "whatsapp",
    arabic: "قناة الواتساب",
    icon: <WhatsAppIcon sx={{ color: "yellowgreen" }} />,
  },
];

const CustomersAddNew = () => {
  const sm = useMediaQuery("(max-width:912px)");
  const [countryCode, setCountryCode] = useState("(+20)");
  const [channels, setChannels] = useState([]);
  const [countryFlag, setCountryFlag] = useState(
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Flag_of_Egypt.svg/2560px-Flag_of_Egypt.svg.png"
      style={{ maxWidth: 20 }}
    />
  );

  const [anchorCountry, setAnchorCountry] = useState(null);
  const openCountryMenu = Boolean(anchorCountry);

  const handleSetChannel = (event) => {
    const {
      target: { value },
    } = event;
    setChannels(typeof value === "string" ? value.split(",") : value);
    console.log(channels.some((e) => e === "youtube"));
  };

  const handleOpenCountryMenu = (event) => {
    setAnchorCountry(event.currentTarget);
  };

  const handleClosenCountryMenu = (code, flag) => {
    if (code && flag) {
      setCountryCode(code);
      setCountryFlag(flag);
    }
    setAnchorCountry(null);
  };

  return (
    <>
      <Wrapper>
        <Parameter
          links={[
            {
              text: "العملاء",
              path: "/",
            },
            {
              text: "إضافة عميل جديد",
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
                sx={{ width: sm ? "100%" : "400px" }}
                fullWidth={sm}
              />
              <TextField
                type="number"
                variant="standard"
                label="الهاتف"
                placeholder="الهاتف"
                sx={{
                  width: sm ? "100%" : "400px",
                  "& .MuiInputBase-root": {
                    overflow: "hidden",
                  },
                }}
                fullWidth={sm}
                pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Button
                        endIcon={<KeyboardArrowDownIcon />}
                        startIcon={countryFlag}
                        onClick={handleOpenCountryMenu}
                        sx={{
                          color: "black",
                          borderRight: "1px solid #00000021",
                        }}
                      >
                        {countryCode ? countryCode : "(+)"}
                      </Button>
                      <Menu
                        anchorEl={anchorCountry}
                        open={openCountryMenu}
                        onClose={() => handleClosenCountryMenu()}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "left",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                      >
                        {countries.map((item, index) => (
                          <MenuItem
                            key={index}
                            onClick={() =>
                              handleClosenCountryMenu(item.code, item.flag)
                            }
                          >
                            <ListItemIcon>{item.flag}</ListItemIcon>
                            <ListItemText primary={item.code} />
                          </MenuItem>
                        ))}
                      </Menu>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                variant="standard"
                label="الريد الإلكتروني"
                placeholder="الريد الإلكتروني"
                sx={{ width: sm ? "100%" : "400px" }}
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
                label="المشروع"
                placeholder="المشروع"
                sx={{ width: sm ? "100%" : "400px" }}
                fullWidth={sm}
              />
              {/* <TextField
                variant="standard"
                label="مسؤول المبيعات"
                placeholder="مسؤول المبيعات"
                sx={{ width: sm ? "100%" : "400px" }}
                fullWidth={sm}
              /> */}
              <FormGroup sx={{ width: sm ? "100%" : "400px" }}>
                <FormLabel
                  sx={{
                    transform: "translate(-50px, -5.5px) scale(0.75)",
                    fontWeight: "bold",
                  }}
                >
                  مسؤول المبيعات
                </FormLabel>
                <Select
                  sx={{
                    width: "100%",
                    height: "35px",
                    "& .muirtl-r49p9a-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                      {
                        color: "black",
                      },
                  }}
                >
                  {salers.map((item, index) => (
                    <MenuItem value={item + index} key={index}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormGroup>
              <TextField
                variant="standard"
                label="الوسيط"
                placeholder="الوسيط"
                sx={{ width: sm ? "100%" : "400px" }}
                fullWidth={sm}
              />
            </Stack>
            <Stack
              direction={sm ? "column" : "row"}
              justifyContent="space-between"
              alignItems="center"
              spacing={sm ? 2 : 1}
            >
              {/* <TextField
                variant="standard"
                label="القناة الإعلانية"
                placeholder="القناة الإعلانية"
                sx={{ width: sm ? "100%" : "400px" }}
                fullWidth={sm}
              /> */}
              <FormGroup sx={{ width: sm ? "100%" : "400px" }}>
                <FormLabel
                  sx={{
                    transform: "translate(-50px, -5.5px) scale(0.75)",
                    fontWeight: "bold",
                  }}
                >
                  القناة الإعلانية
                </FormLabel>
                <Select
                  sx={{
                    width: "100%",
                    height: "35px",
                    "& .muirtl-r49p9a-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                      {
                        color: "black",
                      },
                  }}
                  multiple
                  value={channels}
                  onChange={handleSetChannel}
                  renderValue={(selected) => selected.join(", ")}
                >
                  {selectChannels.map((item, index) => (
                    <MenuItem value={item.name} key={index}>
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.arabic} />
                      <Box>
                        {channels.some((e) => e === item.name) > 0 ? (
                          <CancelIcon sx={{ color: "red" }} />
                        ) : (
                          <AddCircleIcon sx={{ color: "yellowgreen" }} />
                        )}
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormGroup>
              <TextField
                variant="standard"
                label="طريقة التواصل"
                placeholder="طريقة التواصل"
                sx={{ width: sm ? "100%" : "400px" }}
                fullWidth={sm}
              />
              <TextField
                variant="standard"
                label="الميزانية"
                placeholder="الميزانية"
                sx={{ width: sm ? "100%" : "400px" }}
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

export default CustomersAddNew;
