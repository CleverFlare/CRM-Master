import {
  Divider,
  FormControl,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
  InputAdornment,
  ListItemText,
  ListItemIcon,
  Button,
  useMediaQuery,
  Avatar,
  IconButton,
  List,
  ListItem,
  Checkbox,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Parameter from "../../../components/parameter/Parameter";
import Wrapper from "../../../components/wrapper/Wrapper";
import { useState } from "react";
import countries from "./assets/CountriesMapping";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box } from "@mui/system";
import useValidate from "../../../hooks/useValidate";
import useControls from "../../../hooks/useControls";
import useGet from "../../../hooks/useGet";
import usePost from "../../../hooks/usePost";

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

const CustomersAddNew = () => {
  const domain = useSelector((state) => state.domain.value);
  const token = useSelector((state) => state.token.value);
  const [projectsGetRequest, projectsGetRequestError] = useGet(
    "aqar/api/router/Project/"
  );
  const [channelsGetRequest, channelsGetRequestError] = useGet(
    "aqar/api/router/Channel/"
  );
  const [employeesGetRequest, employeesGetRequestError] = useGet(
    "aqar/api/router/Employee/"
  );
  const handleSuccess = () => {
    resetControls();
  };
  const [postRequest, errorAlert, sucessAlert] = usePost(
    "aqar/api/router/Client/",
    "تم إضافة عميل بنجاح!",
    handleSuccess
  );
  const projects = useSelector((state) => state.projects.value);
  const channels = useSelector((state) => state.channels.value);
  const employees = useSelector((state) => state.employees.value);
  const dispatch = useDispatch();
  const [checked, setChecked] = useState([]);
  const [left, setLeft] = useState(projects ? projects : []);
  const [right, setRight] = useState([]);
  const validate = useValidate();

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const [visibilities, setVisibilities] = useState({
    password: false,
    confirm: false,
  });
  const sm = useMediaQuery("(max-width:912px)");

  const [errors, setErrors] = useState({});

  const countriesCodeInit =
    "(+20)" +
    (
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Flag_of_Egypt.svg/2560px-Flag_of_Egypt.svg.png"
        style={{ maxWidth: 20 }}
      />
    );

  const handleVisibilityToggle = (keyName) => {
    setVisibilities({ ...visibilities, [keyName]: !visibilities[keyName] });
  };
  const [controls, setControl, resetControls] = useControls({
    name: "",
    phone: "",
    code: countriesCodeInit,
    email: "",
    saler: {
      name: "",
      id: "",
    },
    mediator: "",
    channel: {
      name: "",
      id: "",
    },
    contact: {
      name: "",
      value: "",
    },
    balance: "",
    password: "",
    confirm: "",
  });

  // const [controls, setControls] = useState({
  //   name: "",
  //   phone: "",
  //   code: countriesCodeInit,
  //   email: "",
  //   saler: {
  //     name: "",
  //     id: "",
  //   },
  //   mediator: "",
  //   channel: {
  //     name: "",
  //     id: "",
  //   },
  //   contact: {
  //     name: "",
  //     value: "",
  //   },
  //   balance: "",
  //   password: "",
  //   confirm: "",
  // });

  const validationOperands = [
    {
      name: "name",
      value: controls.name,
      isRequired: true,
    },
    {
      name: "phone",
      value: controls.phone,
      isRequired: true,
    },
    {
      name: "email",
      value: controls.email,
      isRequired: true,
      validation: [
        {
          regex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          value: "هذا البريد غير صالح",
        },
      ],
    },
    {
      name: "saler",
      value: controls.saler.name,
      isRequired: true,
    },
    {
      name: "mediator",
      value: controls.mediator,
      isRequired: true,
    },
    {
      name: "channel",
      value: controls.channel.name,
      isRequired: true,
    },
    {
      name: "contact",
      value: controls.contact.name,
      isRequired: true,
    },
    {
      name: "balance",
      value: controls.balance,
      isRequired: true,
    },
    {
      name: "password",
      value: controls.password,
      isRequired: true,
    },
    {
      name: "confirm",
      value: controls.confirm,
      isRequired: true,
      validation: [
        {
          regex: new RegExp(`${controls.password}`, ""),
          value: "الرقم السري لا يطابق",
        },
      ],
    },
  ];

  const handleSubmit = () => {
    validate(validationOperands).then((output) => {
      if (!output.ok) return setErrors(output.errors);
      const requestBody = {
        user: {
          first_name: controls.name.split(" ")[0],
          last_name: controls.name.split(" ")[1],
          email: controls.email,
          phone: controls.phone,
          password: controls.password,
          permissions: [],
        },
        organization: 1,
        bussiness: right.map((item) => item.id),
        channel: controls.channel.id,
        agent: controls.saler.id,
        min_budget: "00.00",
        max_budget: "00.00",
        fav_contacts: controls.contact.value,
        comment: "",
      };
      postRequest(requestBody, true, "customers");
    });
  };

  useEffect(() => {
    if (projects.length) return;
    projectsGetRequest().then((res) => {
      dispatch({ type: "projects/set", payload: res });
      setLeft(res);
    });
    if (channels.length) return;
    channelsGetRequest().then((res) => {
      dispatch({ type: "channels/set", payload: res });
    });
    if (employees.length) return;
    employeesGetRequest().then((res) => {
      dispatch({ type: "employees/set", payload: res });
    });
  }, []);

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
              spacing={sm ? 2 : 1}
            >
              <TextField
                variant="standard"
                label="الأسم"
                placeholder="الأسم"
                sx={{
                  width: sm ? "100%" : "400px",
                }}
                fullWidth={sm}
                onChange={({ target: { value } }) => setControl("name", value)}
                value={controls.name}
                error={Boolean(errors?.name)}
                helperText={errors?.name}
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
                onChange={({ target: { value } }) => setControl("phone", value)}
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
                            setControl("code", value)
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
                error={Boolean(errors?.phone)}
                helperText={errors?.phone}
              />
              <TextField
                variant="standard"
                label="البريد الإلكتروني"
                placeholder="البريد الإلكتروني"
                sx={{
                  width: sm ? "100%" : "400px",
                }}
                fullWidth={sm}
                onChange={({ target: { value } }) => setControl("email", value)}
                value={controls.email}
                error={Boolean(errors?.email)}
                helperText={errors?.email}
              />
            </Stack>
            <Stack
              direction={sm ? "column" : "row"}
              justifyContent="space-between"
              spacing={sm ? 2 : 1}
            >
              <TextField
                variant="standard"
                label="مسؤول المبيعات"
                select
                SelectProps={{
                  displayEmpty: true,
                  renderValue: (selected) => {
                    if (!selected) {
                      return (
                        <Typography
                          sx={{ color: "currentColor", opacity: "0.42" }}
                        >
                          مسؤول المبيعات
                        </Typography>
                      );
                    } else {
                      return selected;
                    }
                  },
                  MenuProps: { PaperProps: { style: { maxHeight: "250px" } } },
                  IconComponent: KeyboardArrowDownIcon,
                }}
                sx={{
                  width: sm ? "100%" : "400px",
                }}
                onChange={({ target: { value } }) => {
                  setControl("saler", value);
                }}
                value={controls.saler?.name}
                error={Boolean(errors?.saler)}
                helperText={errors?.saler}
              >
                {employees ? (
                  employees
                    .filter((employee) => employee.job === "Agent")
                    .map((employee, index) => (
                      <MenuItem
                        value={{
                          name:
                            employee.user.first_name +
                            " " +
                            employee.user.last_name,
                          id: employee.id,
                        }}
                        key={index}
                      >
                        {employee.user.first_name} {employee.user.last_name}
                      </MenuItem>
                    ))
                ) : (
                  <MenuItem disabled>empty</MenuItem>
                )}
              </TextField>
              <TextField
                variant="standard"
                label="الوسيط"
                placeholder="الوسيط"
                sx={{
                  width: sm ? "100%" : "400px",
                }}
                value={controls.mediator}
                onChange={(event) => setControl("mediator", event.target.value)}
                fullWidth={sm}
                error={Boolean(errors?.mediator)}
                helperText={errors?.mediator}
              />
              <TextField
                variant="standard"
                label="القناة الإعلانية"
                placeholder="القناة الإعلانية"
                select
                sx={{
                  width: sm ? "100%" : "400px",
                }}
                SelectProps={{
                  displayEmpty: true,
                  renderValue: (selected) => {
                    if (!selected) {
                      return (
                        <Typography
                          sx={{ color: "currentColor", opacity: "0.42" }}
                        >
                          القناة الإعلانية
                        </Typography>
                      );
                    } else {
                      console.log(selected);
                      return selected;
                    }
                  },
                  MenuProps: { PaperProps: { style: { maxHeight: "250px" } } },
                  IconComponent: KeyboardArrowDownIcon,
                }}
                onChange={({ target: { value } }) => {
                  setControl("channel", value);
                }}
                value={controls.channel?.name}
                fullWidth={sm}
                error={Boolean(errors?.channel)}
                helperText={errors?.channel}
              >
                {channels ? (
                  channels.map((channel, index) => (
                    <MenuItem
                      value={{ name: channel.name, id: channel.id }}
                      key={index}
                    >
                      <ListItemIcon sx={{ paddingRight: "10px" }}>
                        <Avatar src={channel.logo} sx={{ bgcolor: "orange" }}>
                          {channel.name[0].toUpperCase()}
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        primary={"قناة " + channel.name}
                        sx={{ color: (theme) => theme.palette.primary.main }}
                      />
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>empty</MenuItem>
                )}
              </TextField>
            </Stack>
            <Stack
              direction={sm ? "column" : "row"}
              justifyContent="space-between"
              spacing={sm ? 2 : 1}
            >
              <TextField
                variant="standard"
                label="طريقة التواصل"
                select
                SelectProps={{
                  displayEmpty: true,
                  renderValue: (selected) => {
                    if (!selected) {
                      return (
                        <Typography
                          sx={{ color: "currentColor", opacity: "0.42" }}
                        >
                          طريقة التواصل
                        </Typography>
                      );
                    } else {
                      return selected;
                    }
                  },
                  MenuProps: { PaperProps: { style: { maxHeight: "250px" } } },
                  IconComponent: KeyboardArrowDownIcon,
                }}
                sx={{
                  width: sm ? "100%" : "400px",
                }}
                onChange={({ target: { value } }) => {
                  setControl("contact", value);
                }}
                value={controls.contact?.name}
                error={Boolean(errors?.contact)}
                helperText={errors?.contact}
              >
                <MenuItem value={{ name: "هاتف", value: "phone" }}>
                  هاتف
                </MenuItem>
                <MenuItem value={{ name: "البريد", value: "email" }}>
                  البريد
                </MenuItem>
                <MenuItem value={{ name: "واتساب", value: "whats app" }}>
                  واتساب
                </MenuItem>
              </TextField>
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
                  setControl("balance", value)
                }
                value={controls.balance}
                error={Boolean(errors?.balance)}
                helperText={errors?.balance}
              />
              <TextField
                type={visibilities.password ? "text" : "password"}
                variant="standard"
                label="الرقم السري"
                placeholder="الرقم السري"
                sx={{ width: sm ? "100%" : "400px" }}
                fullWidth={sm}
                onChange={({ target: { value } }) =>
                  setControl("password", value)
                }
                value={controls.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" sx={{ margin: 0 }}>
                      <IconButton
                        onClick={() => handleVisibilityToggle("password")}
                      >
                        {visibilities.password ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={Boolean(errors?.password)}
                helperText={errors?.password}
              />
            </Stack>
            <Stack
              direction={sm ? "column" : "row"}
              justifyContent="space-between"
              spacing={sm ? 2 : 1}
            >
              <TextField
                type={visibilities.confirm ? "text" : "password"}
                variant="standard"
                label="تأكيد الرقم السري"
                placeholder="تأكيد الرقم السري"
                sx={{ width: sm ? "100%" : "400px" }}
                fullWidth={sm}
                onChange={({ target: { value } }) =>
                  setControl("confirm", value)
                }
                value={controls.confirm}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" sx={{ margin: 0 }}>
                      <IconButton
                        onClick={() => handleVisibilityToggle("confirm")}
                      >
                        {visibilities.confirm ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                autoComplete="off"
                inputProps={{
                  autoComplete: "new-password",
                  form: {
                    autoComplete: "off",
                  },
                }}
                error={Boolean(errors?.confirm)}
                helperText={errors?.confirm}
              />
              <Box
                sx={{
                  width: sm ? "100%" : "400px",
                }}
              ></Box>
              <Box
                sx={{
                  width: sm ? "100%" : "400px",
                }}
              ></Box>
            </Stack>
          </Stack>
          <Paper variant="outlined" sx={{ marginBlock: "20px", width: "100%" }}>
            <Stack
              direction={sm ? "column" : "row"}
              sx={{ flex: 1, width: "100%" }}
            >
              <Stack sx={{ flex: 1, order: 1 }}>
                <Typography sx={{ p: 2, bgcolor: "#f8f8f9" }}>
                  المشاريع العميل
                </Typography>
                <Divider />
                <List
                  sx={{
                    flex: 1,
                    height: "100%",
                    maxHeight: 350,
                    minHeight: 350,
                    overflow: "auto",
                  }}
                >
                  {right &&
                    right.map((project, index) => (
                      <ListItem
                        button
                        role="listitem"
                        key={index}
                        onClick={handleToggle(project)}
                      >
                        <ListItemIcon>
                          <Checkbox
                            checked={checked.indexOf(project) !== -1}
                            tabIndex={-1}
                            disableRipple
                          />
                        </ListItemIcon>
                        <ListItemText primary={project.name} />
                      </ListItem>
                    ))}
                </List>
              </Stack>
              <Divider orientation={sm ? "horizontal" : "vertical"} flexItem />
              <Stack
                direction={sm ? "row" : "column"}
                sx={{
                  flex: 1,
                  width: sm ? "100%" : "max-content",
                  flex: 0,
                  p: 1,
                }}
                justifyContent="center"
                alignItems="center"
                spacing={2}
              >
                <Button
                  variant="outlined"
                  disabled={!left.length}
                  onClick={handleCheckedRight}
                >
                  {sm ? "⤋" : "⟸"}
                </Button>
                <Button
                  variant="outlined"
                  disabled={!right.length}
                  onClick={handleCheckedLeft}
                >
                  {sm ? "⤊" : "⟹"}
                </Button>
              </Stack>
              <Divider orientation={sm ? "horizontal" : "vertical"} flexItem />
              <Stack sx={{ flex: 1, order: -1 }}>
                <Typography sx={{ p: 2, bgcolor: "#f8f8f9" }}>
                  جميع المشاريع
                </Typography>
                <Divider />
                <List
                  sx={{
                    flex: 1,
                    height: "100%",
                    maxHeight: 350,
                    minHeight: 350,
                    overflow: "auto",
                  }}
                >
                  {left &&
                    left.map((project, index) => (
                      <ListItem
                        button
                        role="listitem"
                        key={index}
                        onClick={handleToggle(project)}
                      >
                        <ListItemIcon>
                          <Checkbox
                            checked={checked.indexOf(project) !== -1}
                            tabIndex={-1}
                            disableRipple
                          />
                        </ListItemIcon>
                        <ListItemText primary={project.name} />
                      </ListItem>
                    ))}
                </List>
              </Stack>
            </Stack>
          </Paper>
          <Stack
            direction="row"
            justifyContent="center"
            spacing={1}
            sx={{ padding: 2, bgcolor: "#fffaf3" }}
          >
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              حفظ
            </Button>
            <Button variant="contained" color="error">
              الغاء
            </Button>
          </Stack>
        </Paper>
        {errorAlert}
        {sucessAlert}
      </Wrapper>
    </>
  );
};

export default CustomersAddNew;
