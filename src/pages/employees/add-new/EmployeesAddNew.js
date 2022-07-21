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
import useControls from "../../../hooks/useControls";
import useValidate from "../../../hooks/useValidate";
import usePost from "../../../hooks/usePost";
import useGet from "../../../hooks/useGet";

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

  const [jobsGetRequest, jobsGetRequestError] = useGet("aqar/api/router/Job/");

  const [controls, setControl, resetControls] = useControls({
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
    job: "",
    email: "",
    password: "",
    confirm: "",
  });

  const handleSuccess = () => {
    resetControls();
  };

  const validate = useValidate();

  const [postRequest, successAlert, errorAlert, isPending] = usePost(
    "aqar/api/router/Employee/",
    "تم إضافة موظف جديد بنجاح!",
    handleSuccess
  );

  const jobsData = useSelector((state) => state.jobs.value);

  const dispatch = useDispatch();

  const [jobs, setJobs] = useState(jobsData.length ? jobsData : null);

  const [errors, setErrors] = useState({});

  const [visibilities, setVisibilities] = useState({
    password: false,
    confirm: false,
  });

  const handleVisibilityToggle = (keyName) => {
    setVisibilities({ ...visibilities, [keyName]: !visibilities[keyName] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
        name: "job",
        value: controls.job,
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
            value: "رمز التأكيد لا يطابق رمز الحماية",
          },
        ],
      },
    ]).then((output) => {
      if (!output.ok) return setErrors(output.errors);
      setErrors(output.errors);
      const requestBody = {
        user: {
          first_name: controls.name.split(" ")[0],
          last_name: controls.name.split(" ")[1],
          email: controls.email,
          phone: controls.phone,
          // controls.code.replace(/\((.*?)\)\[.*?\]/gi, "$1") + controls.phone,
          password: controls.password,
          user_permissions: [],
        },
        job: controls.job,
        business: [1],
        organization: 1,
      };
      postRequest(requestBody, true, "employees");
    });
  };

  useEffect(() => {
    if (jobsData.length) return;
    jobsGetRequest().then((res) => {
      dispatch({ type: "jobs/set", payload: res });
      setJobs(res);
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
        <form onSubmit={handleSubmit} autoComplete="off">
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
                    setControl("name", value)
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
                  onChange={({ target: { value } }) =>
                    setControl("phone", value)
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
                              setControl("code", value)
                            }
                            value={controls.code}
                          >
                            {countries.map((item, index) => (
                              <MenuItem
                                key={index}
                                value={item.code + item.flag}
                              >
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
                        let displayedValue = jobs.filter(
                          (job) => job.id === selected
                        )[0].title;
                        return displayedValue;
                      }
                    },
                    MenuProps: {
                      PaperProps: { style: { maxHeight: "250px" } },
                    },
                    IconComponent: KeyboardArrowDownIcon,
                  }}
                  onChange={({ target: { value } }) => {
                    setControl("job", value);
                  }}
                  value={controls.job}
                  error={Boolean(errors?.job)}
                  helperText={errors?.job}
                >
                  {jobs ? (
                    jobs.map((job, index) => (
                      <MenuItem value={job.id} key={index}>
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
                  placeholder="البريد الإلكتروني"
                  sx={{ width: sm ? "100%" : "770px" }}
                  fullWidth={sm}
                  onChange={({ target: { value } }) =>
                    setControl("email", value)
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
                  autoComplete="new-password"
                  label="الرقم السري"
                  placeholder="الرقم السري"
                  sx={{ width: sm ? "100%" : "770px" }}
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
                <TextField
                  type={visibilities.confirm ? "text" : "password"}
                  variant="standard"
                  label="تأكيد الرقم السري"
                  placeholder="تأكيد الرقم السري"
                  sx={{ width: sm ? "100%" : "770px" }}
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
              <Button
                variant="contained"
                type="submit"
                color="primary"
                disabled={isPending}
              >
                حفظ
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => resetControls()}
              >
                الغاء
              </Button>
            </Stack>
          </Paper>
        </form>
        {successAlert}
        {errorAlert}
      </Wrapper>
    </>
  );
};

export default EmployeesAddNew;
