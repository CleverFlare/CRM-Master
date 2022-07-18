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
  IconButton,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Parameter from "../../../components/parameter/Parameter";
import Wrapper from "../../../components/wrapper/Wrapper";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

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

const EmployeesAddNew = () => {
  const sm = useMediaQuery("(max-width:912px)");

  const token = useSelector((state) => state.token.value);

  const domain = useSelector((state) => state.domain.value);

  const jobsData = useSelector((state) => state.jobs.value);

  const dispatch = useDispatch();

  const [jobs, setJobs] = useState(jobsData.length ? jobsData : null);

  const [errors, setErrors] = useState({});

  const [isSubmit, setIsSubmit] = useState(false);

  const [visibilities, setVisibilities] = useState({
    password: false,
    confirm: false,
  });

  const [controls, setControls] = useState({
    name: "",
    code:
      "(+20)" +
      (
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Flag_of_Egypt.svg/2560px-Flag_of_Egypt.svg.png"
          style={{ maxWidth: 20 }}
        />
      ),
    phone: "",
    job: {
      name: "",
      id: "",
    },
    email: "",
    password: "",
    confirm: "",
  });

  const handleVisibilityToggle = (keyName) => {
    setVisibilities({ ...visibilities, [keyName]: !visibilities[keyName] });
  };

  const handleControlUpdate = (controlName, value) => {
    setControls({ ...controls, [controlName]: value });
  };

  const handleSubmit = () => {
    handleValidation();
    setIsSubmit(true);
  };

  const handleValidation = () => {
    setErrors({});
    if (!controls.name) {
      setErrors((oldErrors) => ({ ...oldErrors, name: "هذا الحقل إلزامي" }));
    }

    if (!controls.phone) {
      setErrors((oldErrors) => ({ ...oldErrors, phone: "هذا الحقل إلزامي" }));
    }

    if (!controls.job) {
      setErrors((oldErrors) => ({ ...oldErrors, job: "هذا الحقل إلزامي" }));
    }

    if (!controls.email) {
      setErrors((oldErrors) => ({ ...oldErrors, email: "هذا الحقل إلزامي" }));
    } else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(controls.email)
    ) {
      setErrors((oldErrors) => ({
        ...oldErrors,
        email: "هذا البريد غير صالح",
      }));
    }

    if (!controls.password) {
      setErrors((oldErrors) => ({
        ...oldErrors,
        password: "هذا الحقل إلزامي",
      }));
    }

    if (!controls.confirm) {
      setErrors((oldErrors) => ({
        ...oldErrors,
        confirm: "هذا الحقل إلزامي",
      }));
    } else if (controls.confirm !== controls.password) {
      setErrors((oldErrors) => ({
        ...oldErrors,
        confirm: "رمز التأكيد لا يطابق الرمز الحماية",
      }));
    }
  };

  useEffect(() => {
    if (isSubmit && Object.keys(errors).length === 0) {
      const requestBody = {
        user: {
          first_name: controls.name.split(" ")[0],
          last_name: controls.name.split(" ")[1],
          email: controls.email,
          phone: controls.phone,
          // controls.code.replace(/\((.*?)\)\[.*?\]/gi, "$1") + controls.phone,
          password: controls.password,
          permissions: [],
        },
        job: controls.job.id,
        business: [1],
        organization: 1,
      };
      fetch(domain + "aqar/api/router/Employee/", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          //prettier-ignore
          "Authorization": "Token " + token,
        },
        body: JSON.stringify(requestBody),
      })
        .then((res) => {
          if (!res.ok) throw Error("couldn't fetch the data for that resource");

          return res.json();
        })
        .then((json) => {
          console.log(json);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [errors]);

  useEffect(() => {
    if (jobsData.length) return;
    fetch(domain + "aqar/api/router/Job/", {
      method: "GET",
      headers: {
        //prettier-ignore
        "Authorization": "Token " + token,
      },
    })
      .then((res) => {
        if (!res.ok) throw Error("couldn't fetch the data for that resource");

        return res.json();
      })
      .then((json) => {
        dispatch({ type: "projects/set", payload: json });
        setJobs(json);
      });
  }, []);

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
              spacing={sm ? 2 : 1}
            >
              <TextField
                variant="standard"
                label="الأسم"
                placeholder="الأسم"
                sx={{ width: sm ? "100%" : "770px" }}
                fullWidth={sm}
                onChange={({ target: { value } }) =>
                  handleControlUpdate("name", value)
                }
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
                  width: sm ? "100%" : "770px",
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
                error={Boolean(errors?.phone)}
                helperText={errors?.phone}
              />
            </Stack>
            <Stack
              direction={sm ? "column" : "row"}
              justifyContent="space-between"
              spacing={sm ? 2 : 1}
            >
              <TextField
                variant="standard"
                label="الوظيفة"
                select
                sx={{ width: sm ? "100%" : "770px" }}
                SelectProps={{
                  displayEmpty: true,
                  renderValue: (selected) => {
                    if (!selected) {
                      return (
                        <Typography
                          sx={{ color: "currentColor", opacity: "0.42" }}
                        >
                          الوظيفة
                        </Typography>
                      );
                    } else {
                      return selected;
                    }
                  },
                  MenuProps: { PaperProps: { style: { maxHeight: "250px" } } },
                  IconComponent: KeyboardArrowDownIcon,
                }}
                onChange={({ target: { value } }) => {
                  handleControlUpdate("job", value);
                }}
                value={controls.job?.name}
                error={Boolean(errors?.job)}
                helperText={errors?.job}
              >
                {jobs ? (
                  jobs.map((job, index) => (
                    <MenuItem
                      value={{
                        name: job?.title,
                        id: job?.id,
                      }}
                      key={index}
                    >
                      {job.title}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>empty</MenuItem>
                )}
              </TextField>
              <TextField
                variant="standard"
                label="البريد الإلكتروني"
                autoComplete="off"
                placeholder="البريد الإلكتروني"
                sx={{ width: sm ? "100%" : "770px" }}
                fullWidth={sm}
                onChange={({ target: { value } }) =>
                  handleControlUpdate("email", value)
                }
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
                type={visibilities.password ? "text" : "password"}
                label="الرقم السري"
                placeholder="الرقم السري"
                sx={{ width: sm ? "100%" : "770px" }}
                fullWidth={sm}
                onChange={({ target: { value } }) =>
                  handleControlUpdate("password", value)
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
                inputProps={{
                  autoComplete: "new-password",
                  form: {
                    autoComplete: "off",
                  },
                }}
                error={Boolean(errors?.password)}
                helperText={errors?.password}
              />
              <TextField
                type={visibilities.confirm ? "text" : "password"}
                variant="standard"
                label="تأكيد الرقم السري"
                placeholder="تأكيد الرقم السري"
                sx={{ width: sm ? "100%" : "770px" }}
                fullWidth={sm}
                onChange={({ target: { value } }) =>
                  handleControlUpdate("confirm", value)
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
                error={Boolean(errors?.confirm)}
                helperText={errors?.confirm}
              />
            </Stack>
          </Stack>
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
      </Wrapper>
    </>
  );
};

export default EmployeesAddNew;
