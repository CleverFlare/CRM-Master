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
  Avatar,
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
  "أحمد محمد",
  "أحمد محمد",
  "أحمد محمد",
  "أحمد محمد",
  "أحمد محمد",
  "أحمد محمد",
  "أحمد محمد",
  "أحمد محمد",
  "أحمد محمد",
  "أحمد محمد",
];

const channels = [
  {
    name: "اليوتيوب",
    picture:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/2560px-YouTube_full-color_icon_%282017%29.svg.png",
  },
  {
    name: "الفيسبوك",
    picture:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Facebook_icon.svg/768px-Facebook_icon.svg.png",
  },
  {
    name: "التيليجرام",
    picture:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/240px-Telegram_logo.svg.png",
  },
  {
    name: "الواتساب",
    picture:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/WhatsApp_Logo.svg/2048px-WhatsApp_Logo.svg.png",
  },
];

const CustomersAddNew = () => {
  const sm = useMediaQuery("(max-width:912px)");

  const [controls, setControls] = useState({
    name: "",
    phone: "",
    code:
      "(+20)" +
      (
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Flag_of_Egypt.svg/2560px-Flag_of_Egypt.svg.png"
          style={{ maxWidth: 20 }}
        />
      ),
    email: "",
    project: "",
    saler: "",
    mediator: "",
    channel: "",
    contact: "",
    balance: "",
  });

  const handleControlUpdate = (controlName, value) => {
    setControls({ ...controls, [controlName]: value });
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
                onChange={({ target: { value } }) =>
                  handleControlUpdate("name", value)
                }
                value={controls.name}
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
                  "& .MuiInputBase-input": {
                    appearance: "textfield",
                  },
                  "& .MuiInputBase-input::-webkit-outer-spin-button, & .MuiInputBase-input::-webkit-inner-spin-button":
                    {
                      appearance: "none",
                      margin: 0,
                    },
                }}
                fullWidth={sm}
                pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                autoComplete="off"
                onChange={({ target: { value } }) =>
                  handleControlUpdate("phone", value)
                }
                value={controls.phone}
                inputProps={{ min: 0 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" sx={{ margin: 0 }}>
                      <FormControl
                        variant="standard"
                        sx={{ width: "max-content" }}
                      >
                        <Select
                          defaultValue={countries[0].code + countries[0].flag}
                          sx={{
                            "& .MuiSelect-standard": {
                              display: "flex",
                              alignItems: "center",
                            },
                          }}
                          onChange={({ target: { value } }) =>
                            handleControlUpdate("code", value)
                          }
                          value={controls.code}
                        >
                          {countries.map((item, index) => (
                            <MenuItem key={index} value={item.code + item.flag}>
                              <ListItemIcon
                                sx={{
                                  minWidth: "max-content",
                                  marginRight: "5px",
                                }}
                              >
                                {item.flag}
                              </ListItemIcon>
                              <ListItemText primary={item.code} />
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
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
                onChange={({ target: { value } }) =>
                  handleControlUpdate("email", value)
                }
                value={controls.email}
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
                onChange={({ target: { value } }) =>
                  handleControlUpdate("project", value)
                }
                value={controls.project}
              />
              <FormControl
                variant="standard"
                sx={{ width: sm ? "100%" : "400px" }}
              >
                <InputLabel>مسؤول المبيعات</InputLabel>
                <Select
                  displayEmpty
                  renderValue={(selected) => {
                    if (!selected) {
                      return (
                        <Typography
                          sx={{ color: "currentColor", opacity: "0.42" }}
                        >
                          مسؤول المبيعات
                        </Typography>
                      );
                    } else {
                      console.log(selected.length);
                      return selected.replace(/\d/gi, "");
                    }
                  }}
                  MenuProps={{ PaperProps: { style: { maxHeight: "250px" } } }}
                  IconComponent={KeyboardArrowDownIcon}
                  onChange={({ target: { value } }) =>
                    handleControlUpdate("saler", value)
                  }
                  value={controls.saler}
                >
                  {salers.map((saler, index) => (
                    <MenuItem value={saler + index} key={index}>
                      {saler}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
              <FormControl
                variant="standard"
                sx={{ width: sm ? "100%" : "400px" }}
              >
                <InputLabel>القناة الإعلانية</InputLabel>
                <Select
                  label="الناة الإعلانية"
                  displayEmpty
                  renderValue={(selected) => {
                    if (!selected) {
                      return (
                        <Typography
                          sx={{ color: "currentColor", opacity: "0.42" }}
                        >
                          القناة الإعلانية
                        </Typography>
                      );
                    } else {
                      console.log(selected.length);
                      return selected;
                    }
                  }}
                  MenuProps={{ PaperProps: { style: { maxHeight: "250px" } } }}
                  IconComponent={KeyboardArrowDownIcon}
                  onChange={({ target: { value } }) =>
                    handleControlUpdate("channel", value)
                  }
                  value={controls.channel}
                >
                  {channels.map((channel, index) => (
                    <MenuItem value={channel.name} key={index}>
                      <ListItemIcon sx={{ paddingRight: "10px" }}>
                        <Avatar
                          src={channel.picture}
                          sx={{ bgcolor: "orange" }}
                        >
                          {channel.name[0].toUpperCase()}
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        primary={"قناة " + channel.name}
                        sx={{ color: (theme) => theme.palette.primary.main }}
                      />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                variant="standard"
                label="طريقة التواصل"
                placeholder="طريقة التواصل"
                sx={{ width: sm ? "100%" : "400px" }}
                fullWidth={sm}
                onChange={({ target: { value } }) =>
                  handleControlUpdate("contact", value)
                }
                value={controls.contact}
              />
              <TextField
                type="number"
                variant="standard"
                label="الميزانية"
                placeholder="الميزانية"
                sx={{
                  width: sm ? "100%" : "400px",
                  "& .MuiInputBase-root": {
                    overflow: "hidden",
                  },
                  "& .MuiInputBase-input": {
                    appearance: "textfield",
                  },
                  "& .MuiInputBase-input::-webkit-outer-spin-button, & .MuiInputBase-input::-webkit-inner-spin-button":
                    {
                      appearance: "none",
                      margin: 0,
                    },
                }}
                fullWidth={sm}
                onChange={({ target: { value } }) =>
                  handleControlUpdate("balance", value)
                }
                value={controls.balance}
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
