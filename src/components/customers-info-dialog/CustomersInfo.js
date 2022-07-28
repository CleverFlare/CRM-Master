import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Grow,
  IconButton,
  Input,
  InputAdornment,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useControls from "../../hooks/useControls";
import useGet from "../../hooks/useGet";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CancelIcon from "@mui/icons-material/Cancel";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import NumberFormat from "react-number-format";
import usePatch from "../../hooks/usePatch";
import { Box } from "@mui/system";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Grow direction="up" ref={ref} {...props} unmountOnExit />;
});

const CustomersInfo = ({ isOpened, onClose, initials }) => {
  const projects = useSelector((state) => state.projects.value);

  const dials = useSelector((state) => state.dial.value);

  const [controls, setControl, resetControls] = useControls({
    name: "",
    email: "",
    phone: "",
    code: dials[0].dial,
    projects: [],
    channel: "",
    budget: "",
    contact: "",
  });

  const [patchRequest, successAlert, errorAlert, isPending] = usePatch(
    "aqar/api/router/Client/"
  );

  const dispatch = useDispatch();

  const [projectsGetRequest, projectsGetRequestError] = useGet(
    "aqar/api/router/Project/"
  );

  useEffect(() => {
    if (Boolean(projects.length)) return;
    projectsGetRequest().then((res) =>
      dispatch({ type: "projects/set", payload: res.results })
    );
  }, []);

  useEffect(() => {
    const idsArray = [];
    initials?.allData?.bussiness.map((project) => {
      idsArray.push(projects?.filter((item) => item.name === project)[0].id);
    });
    setControl("projects", idsArray);
  }, [initials]);

  const handleClose = () => {
    resetControls();
    onClose();
  };

  const handleSubmit = () => {
    if (
      !Boolean(controls.name) &&
      !Boolean(controls.email) &&
      !Boolean(controls.phone) &&
      !Boolean(controls.projects) &&
      !Boolean(controls.channel) &&
      !Boolean(controls.budget) &&
      !Boolean(controls.contact)
    )
      return;
    const requestBody = {
      user: {},
    };
    Boolean(controls.name) &&
      (requestBody.user.first_name = controls.name.split(" ")[0]);
    Boolean(controls.name) &&
      (requestBody.user.last_name = controls.name.split(" ")[1]
        ? controls.name.split(" ")[1]
        : "");
    Boolean(controls.email) && (requestBody.user.email = controls.email);
    Boolean(controls.phone) &&
      (requestBody.user.phone = controls.code + controls.phone);
    Boolean(controls.projects.length) &&
      (requestBody.bussiness = [...controls.projects]);
    Boolean(controls.channel) && (requestBody.channel = controls.channel);
    Boolean(controls.budget) &&
      (requestBody.max_budget = controls.budget.replace(/,/gi, ""));
    Boolean(controls.contact) && (requestBody.fav_contacts = controls.contact);
    patchRequest(requestBody, true, "allCustomers", initials?.id).then(
      (res) => {
        if (!res) return;
        handleClose();
      }
    );
  };

  return (
    <Dialog
      open={isOpened}
      onClose={handleClose}
      TransitionComponent={Transition}
      sx={{
        "& .MuiDialog-paper": {
          bgcolor: (theme) => theme.palette.primary.main,
          color: "white",
          maxWidth: 800,
          width: "90vw",
          maxHeight: "90vh",
          overflowY: "auto",
        },
        ".MuiDialogContent-root": {
          height: "max-content",
          flex: "unset",
          overflow: "initial",
        },
      }}
      BackdropProps={{
        sx: {
          bgcolor: "rgb(255 255 255 / 50%)",
        },
      }}
    >
      <DialogTitle>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6">تعديل بيانات العميل</Typography>
          <IconButton sx={{ color: "white" }} onClick={handleClose}>
            <ArrowBackIcon sx={{ color: "white" }} />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent sx={{ marginBlock: "20px" }}>
        <Grid container spacing={4} sx={{ maxWidth: "100%" }}>
          <Grid item xs={3}>
            الأسم*
          </Grid>
          <Grid item xs={9}>
            <TextField
              variant="standard"
              sx={{
                width: "100%",
                "& .MuiInputBase-root": {
                  bgcolor: "white",
                  overflow: "hidden",
                },
              }}
              placeholder={initials?.name}
              value={controls.name}
              onChange={(e) => setControl("name", e.target.value)}
            />
          </Grid>
          <Grid item xs={3}>
            البريد الألكتروني*
          </Grid>
          <Grid item xs={9}>
            <TextField
              variant="standard"
              sx={{
                width: "100%",
                "& .MuiInputBase-root": {
                  bgcolor: "white",
                  overflow: "hidden",
                },
              }}
              placeholder={initials?.allData?.user?.email}
              value={controls.email}
              onChange={(e) => setControl("email", e.target.value)}
            />
          </Grid>
          <Grid item xs={3}>
            الهاتف*
          </Grid>
          <Grid item xs={9}>
            <TextField
              variant="standard"
              sx={{
                width: "100%",
                "& .MuiInputBase-root": {
                  bgcolor: "white",
                  overflow: "hidden",
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" sx={{ margin: 0 }}>
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
                      PaperProps={{
                        sx: { maxHeight: 50, overflowY: "hidden" },
                      }}
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
                                الكود
                              </Typography>
                            );
                          } else {
                            const selectedCountry = dials.filter(
                              (item) => item.dial === selected
                            )[0];
                            return (
                              <Stack direction="row" spacing={1}>
                                <img
                                  src={selectedCountry.flag}
                                  style={{ maxWidth: 20 }}
                                />
                                <Typography>{selectedCountry.dial}</Typography>
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
              placeholder={initials?.phone}
              value={controls.phone}
              onChange={(e) => setControl("phone", e.target.value)}
            />
          </Grid>
          <Grid item xs={3}>
            المشروع*
          </Grid>
          <Grid item xs={9}>
            <TextField
              variant="standard"
              select
              SelectProps={{
                displayEmpty: true,
                multiple: true,
                renderValue: (selected) => {
                  if (!Boolean(selected.length)) {
                    return (
                      <Typography sx={{ opacity: ".5" }}>المشروع</Typography>
                    );
                  } else {
                    const displayedArray = selected.map(
                      (projectId) =>
                        projects.filter(
                          (project) => project.id === projectId
                        )[0]?.name
                    );
                    return displayedArray.join(" ، ");
                  }
                },
                MenuProps: { PaperProps: { style: { maxHeight: "250px" } } },
                IconComponent: KeyboardArrowDownIcon,
              }}
              sx={{
                width: "100%",
                "& .MuiInputBase-root": {
                  bgcolor: "white",
                  overflow: "hidden",
                },
              }}
              value={controls.projects}
              onChange={(e) => setControl("projects", e.target.value)}
            >
              {Boolean(projects.length) ? (
                projects?.map((project, index) => (
                  <MenuItem
                    value={project?.id}
                    key={project?.name + " " + index}
                  >
                    {project?.name}
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      {controls.projects?.indexOf(project.id) > -1 ? (
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
          </Grid>
          <Grid item xs={3}>
            القناة*
          </Grid>
          <Grid item xs={9}>
            <TextField
              variant="standard"
              sx={{
                width: "100%",
                "& .MuiInputBase-root": {
                  bgcolor: "white",
                  overflow: "hidden",
                },
              }}
              placeholder={initials?.channel}
              value={controls.channel}
              onChange={(e) => setControl("channel", e.target.value)}
            />
          </Grid>
          <Grid item xs={3}>
            الميزانية*
          </Grid>
          <Grid item xs={9}>
            <NumberFormat
              thousandSeparator
              customInput={Input}
              sx={{
                width: "100%",
                "&.MuiInputBase-root": {
                  bgcolor: "white",
                  overflow: "hidden",
                },
              }}
              placeholder={initials?.allData?.max_budget}
              value={controls.budget}
              onChange={(e) => setControl("budget", e.target.value)}
            />
          </Grid>
          <Grid item xs={3}>
            طريقة التواصل*
          </Grid>
          <Grid item xs={9}>
            <TextField
              variant="standard"
              select
              SelectProps={{
                displayEmpty: true,
                renderValue: (selected) => {
                  if (!Boolean(selected)) {
                    return (
                      <Typography sx={{ opacity: ".5" }}>
                        {initials?.allData?.fav_contacts}
                      </Typography>
                    );
                  } else {
                    switch (selected) {
                      case "phone":
                        return "الهاتف";
                      case "email":
                        return "البريد";
                      case "whatsapp":
                        return "الواتساب";
                    }
                    return selected;
                  }
                },
              }}
              sx={{
                width: "100%",
                "& .MuiInputBase-root": {
                  bgcolor: "white",
                  overflow: "hidden",
                },
              }}
              value={controls.contact}
              onChange={(e) => setControl("contact", e.target.value)}
            >
              <MenuItem value="phone">الهاتف</MenuItem>
              <MenuItem value="email">البريد</MenuItem>
              <MenuItem value="whatsapp">الواتساب</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogContent>
        <Stack
          sx={{ width: "100%" }}
          justifyContent="center"
          alignItems="center"
        >
          <Button
            variant="contained"
            sx={{
              maxWidth: "150px",
              width: "100vmax",
              height: "50px",
              bgcolor: "white",
              color: (theme) => theme.palette.primary.main,
              "&:hover": {
                bgcolor: "white",
                color: (theme) => theme.palette.primary.main,
                filter: "brightness(.9)",
              },
            }}
            onClick={handleSubmit}
          >
            <Typography sx={{ fontWeight: "bold" }}>حفظ</Typography>
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default CustomersInfo;
