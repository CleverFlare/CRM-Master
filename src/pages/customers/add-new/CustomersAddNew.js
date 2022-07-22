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
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Parameter from "../../../components/parameter/Parameter";
import Wrapper from "../../../components/wrapper/Wrapper";
import { useState } from "react";
import countries from "./assets/CountriesMapping";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box } from "@mui/system";
import useValidate from "../../../hooks/useValidate";
import useControls from "../../../hooks/useControls";
import useGet from "../../../hooks/useGet";
import usePost from "../../../hooks/usePost";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const CustomersAddNew = () => {
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
  const [postRequest, errorAlert, sucessAlert, isPending] = usePost(
    "aqar/api/router/Client/",
    "تم إضافة عميل بنجاح!",
    handleSuccess
  );
  const projects = useSelector((state) => state.projects.value);
  const channels = useSelector((state) => state.channels.value);
  const employees = useSelector((state) => state.employees.value);
  const dispatch = useDispatch();
  const validate = useValidate();

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

  const [controls, setControl, resetControls] = useControls({
    name: "",
    phone: "",
    code: countriesCodeInit,
    email: "",
    saler: "",
    mediator: "",
    channel: "",
    contact: "",
    budget: "",
    password: "",
    confirm: "",
    projects: [],
  });

  const handleSubmit = () => {
    validate([
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
        value: controls.saler,
        isRequired: true,
      },
      {
        name: "mediator",
        value: controls.mediator,
        isRequired: true,
      },
      {
        name: "channel",
        value: controls.channel,
        isRequired: true,
      },
      {
        name: "contact",
        value: controls.contact,
        isRequired: true,
      },
      {
        name: "budget",
        value: controls.budget,
        isRequired: true,
      },
      {
        name: "projects",
        value: controls.projects.join(" "),
        isRequired: true,
      },
    ]).then((output) => {
      if (!output.ok) return setErrors(output.errors);
      setErrors(null);
      const requestBody = {
        user: {
          first_name: controls.name.split(" ")[0],
          last_name: controls.name.split(" ")[1],
          email: controls.email,
          phone: controls.phone,
          user_permissions: [],
          permissions: [],
        },
        organization: 1,
        bussiness: controls.projects,
        channel: controls.channel,
        agent: controls.saler,
        min_budget: "00.00",
        max_budget: controls.budget,
        fav_contacts: controls.contact,
        comment: "",
        aqar_comment_client: [],
      };
      postRequest(requestBody, true, "allCustomers");
    });
  };

  useEffect(() => {
    if (projects.length) return;
    projectsGetRequest().then((res) => {
      dispatch({ type: "projects/set", payload: res });
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
                label="المشروع"
                select
                SelectProps={{
                  defaultValue: "",
                  displayEmpty: true,
                  multiple: true,
                  renderValue: (selected) => {
                    if (!selected.length) {
                      return (
                        <Typography
                          sx={{ color: "currentColor", opacity: "0.42" }}
                        >
                          المشروع
                        </Typography>
                      );
                    } else {
                      let displayedArray = [];
                      selected.forEach((id, index) => {
                        displayedArray.push(
                          projects.filter((project) => project.id === id)[0]
                            .name
                        );
                      });
                      return displayedArray.join(" ، ");
                    }
                  },
                  MenuProps: { PaperProps: { style: { maxHeight: "250px" } } },
                  IconComponent: KeyboardArrowDownIcon,
                }}
                sx={{
                  width: sm ? "100%" : "400px",
                }}
                onChange={({ target: { value } }) => {
                  setControl("projects", value);
                }}
                value={controls.projects}
                error={Boolean(errors?.projects)}
                helperText={errors?.projects}
              >
                {projects ? (
                  projects.map((project, index) => (
                    <MenuItem value={project.id} key={index}>
                      {project.name}
                      <Box
                        sx={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "flex-end",
                        }}
                      >
                        {controls.projects.indexOf(project.id) > -1 ? (
                          <CancelIcon sx={{ color: "#f54242" }} />
                        ) : (
                          <AddCircleIcon
                            sx={{
                              color: (theme) => theme.palette.primary.main,
                            }}
                          />
                        )}
                      </Box>
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>empty</MenuItem>
                )}
              </TextField>
              <TextField
                variant="standard"
                label="مسؤول المبيعات"
                select
                SelectProps={{
                  defaultValue: "",
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
                      let displayedValue =
                        employees.filter(
                          (employee) => employee.id === selected
                        )[0].user.first_name +
                        " " +
                        employees.filter(
                          (employee) => employee.id === selected
                        )[0].user.last_name;
                      return displayedValue;
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
                value={controls.saler}
                error={Boolean(errors?.saler)}
                helperText={errors?.saler}
              >
                {employees ? (
                  employees.map((employee, index) => (
                    <MenuItem value={employee.id} key={index}>
                      {employee.user.first_name + " " + employee.user.last_name}
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
            </Stack>
            <Stack
              direction={sm ? "column" : "row"}
              justifyContent="space-between"
              spacing={sm ? 2 : 1}
            >
              <TextField
                variant="standard"
                label="القناة الإعلانية"
                placeholder="القناة الإعلانية"
                select
                sx={{
                  width: sm ? "100%" : "400px",
                }}
                SelectProps={{
                  defaultValue: "",
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
                      let displayedValue = channels.filter(
                        (channel) => channel.id === selected
                      )[0].name;
                      return displayedValue;
                    }
                  },
                  MenuProps: { PaperProps: { style: { maxHeight: "250px" } } },
                  IconComponent: KeyboardArrowDownIcon,
                }}
                onChange={({ target: { value } }) => {
                  setControl("channel", value);
                }}
                value={controls.channel}
                fullWidth={sm}
                error={Boolean(errors?.channel)}
                helperText={errors?.channel}
              >
                {channels ? (
                  channels.map((channel, index) => (
                    <MenuItem value={channel.id} key={index}>
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
              <TextField
                variant="standard"
                label="طريقة التواصل"
                select
                SelectProps={{
                  defaultValue: "",
                  displayEmpty: true,
                  renderValue: (selected) => {
                    if (!controls.contact) {
                      return (
                        <Typography
                          sx={{ color: "currentColor", opacity: "0.42" }}
                        >
                          طريقة التواصل
                        </Typography>
                      );
                    } else {
                      switch (controls.contact) {
                        case "phone":
                          return "هاتف";
                        case "email":
                          return "البريد";
                        case "whats app":
                          return "واتساب";
                      }
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
                value={controls.contact.name}
                error={Boolean(errors?.contact)}
                helperText={errors?.contact}
              >
                <MenuItem value={"phone"}>هاتف</MenuItem>
                <MenuItem value={"email"}>البريد</MenuItem>
                <MenuItem value={"whats app"}>واتساب</MenuItem>
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
                  setControl("budget", value)
                }
                value={controls.budget}
                error={Boolean(errors?.budget)}
                helperText={errors?.budget}
              />
            </Stack>
          </Stack>
          <Stack
            direction="row"
            justifyContent="center"
            spacing={1}
            sx={{ padding: 2, bgcolor: "#fffaf3" }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={isPending}
            >
              حفظ
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => resetControls()}
              disabled={isPending}
            >
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
