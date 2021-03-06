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
  Grid,
  Switch,
  Box,
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
  const [permissionsState, setPermissionsState] = useState([]);

  const [jobsGetRequest, jobsGetRequestError] = useGet("aqar/api/router/Job/");

  const dials = useSelector((state) => state.dial.value);

  const [controls, setControl, resetControls] = useControls({
    name: "",
    code: dials[0].dial,
    phone: "",
    job: "",
    email: "",
    password: "",
    confirm: "",
  });

  const handleSuccess = () => {
    setPermissionsState([]);
    resetControls();
  };

  const validate = useValidate();

  const [postRequest, successAlert, errorAlert, isPending] = usePost(
    "aqar/api/router/Employee/",
    "???? ?????????? ???????? ???????? ??????????!",
    handleSuccess
  );

  const jobsData = useSelector((state) => state.jobs?.value);

  const dispatch = useDispatch();

  const [jobs, setJobs] = useState(jobsData?.length ? jobsData : null);

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
            value: "?????? ???????????? ?????? ????????",
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
            value: "?????? ?????????????? ???? ?????????? ?????? ??????????????",
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
          phone: controls.code + controls.phone,
          // controls.code.replace(/\((.*?)\)\[.*?\]/gi, "$1") + controls.phone,
          password: controls.password,
          user_permissions: permissionsState?.map((permission) => ({
            codename: permission,
          })),
        },
        job: controls.job,
        business: [1],
        organization: 1,
      };
      postRequest(requestBody, true, "employees");
    });
  };

  useEffect(() => {
    if (jobsData?.length) return;
    jobsGetRequest().then((res) => {
      dispatch({ type: "jobs/set", payload: res.results });
      setJobs(res);
    });
  }, []);

  const handleTogglePermission = (e) => {
    switch (e.target.checked) {
      case true:
        return setPermissionsState((old) => [...old, e.target.value]);
      case false:
        return setPermissionsState((old) =>
          old.filter((item) => item !== e.target.value)
        );
    }
  };

  return (
    <>
      <Wrapper>
        <Parameter
          links={[
            {
              text: "????????????????",
              path: "/",
            },
            {
              text: "?????????? ???????? ????????",
              path: "/",
            },
          ]}
        />
        <form onSubmit={handleSubmit} autoComplete="off">
          <Paper sx={{ overflow: "hidden" }}>
            <Stack sx={{ padding: 2, bgcolor: "#f8f8f9" }}>
              <Typography sx={{ fontWeight: "bold" }}>?????????? ????!</Typography>
              <Typography>
                ???????????? ?????? ?????????????????? ???????????? ???????????? ???????? ????????
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
                  label="??????????"
                  placeholder="??????????"
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
                  label="????????????"
                  placeholder="????????????"
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
                    setControl("phone", value)
                  }
                  value={controls.phone}
                  inputProps={{ min: 0 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start" sx={{ margin: 0 }}>
                        {/* <FormControl
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
                          value={dials[0].dial + " " + dials[0].flag}
                        ></Select>
                      </FormControl> */}
                        <TextField
                          variant="standard"
                          select
                          sx={{
                            "& .MuiSelect-standard": {
                              width: 60,
                            },
                          }}
                          onChange={({ target: { value } }) =>
                            setControl("code", value)
                          }
                          value={controls.code}
                          SelectProps={{
                            defaultValue: "",
                            displayEmpty: true,
                            renderValue: (selected) => {
                              if (!selected) {
                                return (
                                  <Typography
                                    sx={{
                                      color: "currentColor",
                                      opacity: "0.42",
                                    }}
                                  >
                                    ??????????
                                  </Typography>
                                );
                              } else {
                                const selectedCountry = dials.filter(
                                  (item) => item.dial === selected
                                )[0];
                                console.log(selectedCountry);
                                return (
                                  <Stack direction="row" spacing={1}>
                                    <img
                                      src={selectedCountry.flag}
                                      style={{ maxWidth: 20 }}
                                    />
                                    <Typography>
                                      {selectedCountry.dial}
                                    </Typography>
                                  </Stack>
                                );
                              }
                            },
                            MenuProps: {
                              PaperProps: { style: { maxHeight: "250px" } },
                            },
                            IconComponent: KeyboardArrowDownIcon,
                          }}
                        >
                          {dials?.map((item, index) => (
                            <MenuItem key={index} value={item.dial}>
                              <ListItemIcon
                                sx={{
                                  minWidth: "max-content",
                                  marginRight: "5px",
                                }}
                              >
                                <img src={item.flag} style={{ maxWidth: 20 }} />
                              </ListItemIcon>
                              <ListItemText primary={item.code} />
                            </MenuItem>
                          ))}
                        </TextField>
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
                  label="??????????????"
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
                            ??????????????
                          </Typography>
                        );
                      } else {
                        let displayedValue = jobs?.filter(
                          (job) => job?.id === selected
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
                    let selectedId = jobs
                      .filter((job) => job?.id === value)[0]
                      .permissions?.map((permissions) => permissions.codename);
                    setControl("job", value);
                    setPermissionsState(selectedId);
                  }}
                  value={controls.job}
                  error={Boolean(errors?.job)}
                  helperText={errors?.job}
                >
                  {Boolean(jobs?.length) ? (
                    jobs?.map((job, index) => (
                      <MenuItem value={job?.id} key={index}>
                        {job?.title}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>empty</MenuItem>
                  )}
                </TextField>
                <TextField
                  variant="standard"
                  label="???????????? ????????????????????"
                  placeholder="???????????? ????????????????????"
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
                  label="?????????? ??????????"
                  placeholder="?????????? ??????????"
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
                  label="?????????? ?????????? ??????????"
                  placeholder="?????????? ?????????? ??????????"
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
              <Box
                sx={{
                  display: Boolean(permissionsState?.length)
                    ? "initial"
                    : "none",
                }}
              >
                <Grid
                  container
                  spacing={2}
                  // columnSpacing={13}
                  sx={{
                    "& .MuiGrid-item": {
                      paddingRight: 13,
                    },
                  }}
                >
                  <Grid
                    item
                    sm={12}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      ?????????????? ??????????????????
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    ?????????? ??????????
                    <Switch
                      value="add_aqarpost"
                      onChange={handleTogglePermission}
                      checked={permissionsState?.includes("add_aqarpost")}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    ?????? ??????????
                    <Switch
                      value="delete_aqarpost"
                      onChange={handleTogglePermission}
                      checked={permissionsState?.includes("delete_aqarpost")}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    ?????? ??????????????????
                    <Switch
                      value="view_aqarpost"
                      onChange={handleTogglePermission}
                      checked={permissionsState?.includes("view_aqarpost")}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    ?????????? ??????????
                    <Switch
                      value="change_aqarpost"
                      onChange={handleTogglePermission}
                      checked={permissionsState?.includes("change_aqarpost")}
                    />
                  </Grid>
                </Grid>

                <Grid
                  container
                  spacing={2}
                  // columnSpacing={13}
                  sx={{
                    "& .MuiGrid-item": {
                      paddingRight: 13,
                    },
                  }}
                >
                  <Grid
                    item
                    sm={12}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      ?????????????? ????????????????
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    ?????????? ????????
                    <Switch
                      value="add_aqaremployee"
                      onChange={handleTogglePermission}
                      checked={permissionsState?.includes("add_aqaremployee")}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    ?????? ????????
                    <Switch
                      value="delete_aqaremployee"
                      onChange={handleTogglePermission}
                      checked={permissionsState?.includes(
                        "delete_aqaremployee"
                      )}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    ?????? ????????????????
                    <Switch
                      value="view_aqaremployee"
                      onChange={handleTogglePermission}
                      checked={permissionsState?.includes("view_aqaremployee")}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    ?????????? ????????
                    <Switch
                      value="change_aqaremployee"
                      onChange={handleTogglePermission}
                      checked={permissionsState?.includes(
                        "change_aqaremployee"
                      )}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    ?????????? ??????????
                    <Switch
                      value="add_aqarjob"
                      onChange={handleTogglePermission}
                      checked={permissionsState?.includes("add_aqarjob")}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    ?????? ??????????
                    <Switch
                      value="delete_aqarjob"
                      onChange={handleTogglePermission}
                      checked={permissionsState?.includes("delete_aqarjob")}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    ?????? ??????????
                    <Switch
                      value="view_aqarjob"
                      onChange={handleTogglePermission}
                      checked={permissionsState?.includes("view_aqarjob")}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    ?????????? ??????????
                    <Switch
                      value="change_aqarjob"
                      onChange={handleTogglePermission}
                      checked={permissionsState?.includes("change_aqarjob")}
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={2}
                  // columnSpacing={13}
                  sx={{
                    "& .MuiGrid-item": {
                      paddingRight: 13,
                    },
                  }}
                >
                  <Grid
                    item
                    sm={12}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      ?????????????? ??????????????
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    ?????????? ????????
                    <Switch
                      value="add_aqarclient"
                      onChange={handleTogglePermission}
                      checked={permissionsState?.includes("add_aqarclient")}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    ?????? ????????
                    <Switch
                      value="delete_aqarclient"
                      onChange={handleTogglePermission}
                      checked={permissionsState?.includes("delete_aqarclient")}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    ?????? ??????????????
                    <Switch
                      value="view_aqarclient"
                      onChange={handleTogglePermission}
                      checked={permissionsState?.includes("view_aqarclient")}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    ?????????? ??????????????
                    <Switch
                      value="change_aqarclient"
                      onChange={handleTogglePermission}
                      checked={permissionsState?.includes("change_aqarclient")}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    ?????????? ???????? ????????
                    <Switch
                      value="add_aqarevent"
                      onChange={handleTogglePermission}
                      checked={permissionsState?.includes("add_aqarevent")}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    ?????? ???????? ????????
                    <Switch
                      value="delete_aqarevent"
                      onChange={handleTogglePermission}
                      checked={permissionsState?.includes("delete_aqarevent")}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    ?????????? ???????? ????????
                    <Switch
                      value="change_aqarevent"
                      onChange={handleTogglePermission}
                      checked={permissionsState?.includes("change_aqarevent")}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    ?????? ???????? ??????????????
                    <Switch
                      value="view_aqarevent"
                      onChange={handleTogglePermission}
                      checked={permissionsState?.includes("view_aqarevent")}
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={2}
                  // columnSpacing={13}
                  sx={{
                    "& .MuiGrid-item": {
                      paddingRight: 13,
                    },
                  }}
                >
                  <Grid
                    item
                    sm={12}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      ?????????????? ????????????????
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    ?????????? ??????????
                    <Switch
                      value="add_aqarproject"
                      onChange={handleTogglePermission}
                      checked={permissionsState?.includes("add_aqarproject")}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    ?????? ??????????
                    <Switch
                      value="delete_aqarproject"
                      onChange={handleTogglePermission}
                      checked={permissionsState?.includes("delete_aqarproject")}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    ?????? ????????????????
                    <Switch
                      value="view_aqarproject"
                      onChange={handleTogglePermission}
                      checked={permissionsState?.includes("view_aqarproject")}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    ?????????? ??????????
                    <Switch
                      value="change_aqarproject"
                      onChange={handleTogglePermission}
                      checked={permissionsState?.includes("change_aqarproject")}
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={2}
                  // columnSpacing={13}
                  sx={{
                    "& .MuiGrid-item": {
                      paddingRight: 13,
                    },
                  }}
                >
                  <Grid
                    item
                    sm={12}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      ?????????????? ??????????????
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    ?????????? ????????
                    <Switch
                      value="add_aqarchannel"
                      onChange={handleTogglePermission}
                      checked={permissionsState?.includes("add_aqarchannel")}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    ?????? ????????
                    <Switch
                      value="delete_aqarchannel"
                      onChange={handleTogglePermission}
                      checked={permissionsState?.includes("delete_aqarchannel")}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    ?????? ??????????????
                    <Switch
                      value="view_aqarchannel"
                      onChange={handleTogglePermission}
                      checked={permissionsState?.includes("view_aqarchannel")}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    ?????????? ????????
                    <Switch
                      value="change_aqarchannel"
                      onChange={handleTogglePermission}
                      checked={permissionsState?.includes("change_aqarchannel")}
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={2}
                  // columnSpacing={13}
                  sx={{
                    "& .MuiGrid-item": {
                      paddingRight: 13,
                    },
                  }}
                >
                  <Grid
                    item
                    sm={12}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      ?????????????? ??????????????
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    ???????????? ?????? ?????????????? ??????????????
                    <Switch
                      onChange={(e) => {
                        switch (e.target.checked) {
                          case true:
                            return setPermissionsState([
                              "add_aqarchannel",
                              "change_aqarchannel",
                              "delete_aqarchannel",
                              "view_aqarchannel",
                              "add_aqarclient",
                              "change_aqarclient",
                              "delete_aqarclient",
                              "view_aqarclient",
                              "add_aqarevent",
                              "change_aqarevent",
                              "delete_aqarevent",
                              "view_aqarevent",
                              "add_aqaremployee",
                              "change_aqaremployee",
                              "delete_aqaremployee",
                              "view_aqaremployee",
                              "add_aqarjob",
                              "change_aqarjob",
                              "delete_aqarjob",
                              "view_aqarjob",
                              "add_aqarproject",
                              "change_aqarproject",
                              "delete_aqarproject",
                              "view_aqarproject",
                              "add_aqarpost",
                              "delete_aqarpost",
                              "change_aqarpost",
                              "view_aqarpost",
                            ]);
                          case false:
                            let jobPermissions = jobs
                              .filter((job) => job?.id === controls.job)[0]
                              .permissions?.map(
                                (permission) => permission.codename
                              );
                            return setPermissionsState(jobPermissions);
                        }
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
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
                ??????
              </Button>
              <Button variant="contained" color="error" onClick={handleSuccess}>
                ??????????
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
