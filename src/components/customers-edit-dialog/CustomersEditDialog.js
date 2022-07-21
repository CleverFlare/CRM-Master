import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  Grow,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import axios from "axios";
import usePatch from "../../hooks/usePatch";
import { useSelector } from "react-redux";
import useControls from "../../hooks/useControls";
import useGet from "../../hooks/useGet";
import { useDispatch } from "react-redux";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Grow direction="up" ref={ref} {...props} />;
});

const CustomersEditDialog = ({ isOpened, onClose, initials }) => {
  const jobs = useSelector((state) => state.jobs.value);
  const [controls, setControl, resetControls] = useControls({
    name: "",
    email: "",
    job: "",
    permissions: [],
  });
  const dispatch = useDispatch();
  const [jobsGetRequest, jobsGetRequestError] = useGet("aqar/api/router/Job/");
  const [patch, putSuccessAlert, putErrorAlert, isPending] = usePatch(
    "aqar/api/router/Employee/",
    "تم تعديل الموظف بنجاح!",
    onClose
  );
  const sendData = () => {
    const requestBody = {
      user: {
        user_permissions: [],
      },
    };
    if (Boolean(controls.name)) {
      requestBody.user.first_name = controls.name.split(" ")[0];
      requestBody.user.last_name = controls.name.split(" ")[1]
        ? controls.name.split(" ")[1]
        : "";
    }
    Boolean(controls.email) && (requestBody.user.email = controls.email);
    Boolean(controls.job) && (requestBody.job = controls.job);
    patch(
      requestBody,
      true,
      [
        { name: "employees", path: "aqar/api/router/Employee/" },
        { name: "allCustomers", path: "aqar/api/router/Client/" },
      ],
      initials.id + "/"
    ).then(() => {
      resetControls();
    });
  };
  useEffect(() => {
    if (Boolean(jobs?.length)) return;
    jobsGetRequest().then((res) => {
      dispatch({ type: "jobs/set", payload: res });
    });
  }, []);
  return (
    <Dialog
      open={isOpened}
      onClose={onClose}
      TransitionComponent={Transition}
      sx={{
        "& .MuiDialog-paper": {
          bgcolor: (theme) => theme.palette.primary.main,
          color: "white",
          maxWidth: 1000,
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
      <DialogTitle>تعديل بيانات الموظفين</DialogTitle>
      <DialogContent>
        <Grid container spacing={4} sx={{ maxWidth: "100%" }}>
          <Grid item xs={2}>
            الإسم*
          </Grid>
          <Grid item xs={10}>
            <TextField
              variant="standard"
              sx={{
                maxWidth: 500,
                width: "100%",
                "& .MuiInputBase-root": {
                  bgcolor: "white",
                  overflow: "hidden",
                },
              }}
              placeholder={initials.name}
              value={controls.name}
              onChange={(e) => setControl("name", e.target.value)}
            />
          </Grid>
          <Grid item xs={2}>
            البريد الإلكتروني*
          </Grid>
          <Grid item xs={10}>
            <TextField
              variant="standard"
              sx={{
                maxWidth: 500,
                width: "100%",
                "& .MuiInputBase-root": {
                  bgcolor: "white",
                  overflow: "hidden",
                },
              }}
              placeholder={initials.email}
              value={controls.email}
              onChange={(e) => setControl("email", e.target.value)}
            />
          </Grid>
          <Grid item xs={2}>
            الوظيفة*
          </Grid>
          <Grid item xs={10}>
            <TextField
              variant="standard"
              select
              sx={{
                maxWidth: 500,
                width: "100%",
                "& .MuiInputBase-root": {
                  bgcolor: "white",
                  overflow: "hidden",
                },
              }}
              SelectProps={{
                displayEmpty: true,
                renderValue: (selected) => {
                  if (!selected) {
                    return (
                      <Typography
                        sx={{ color: "currentColor", opacity: "0.42" }}
                      >
                        {initials.job}
                      </Typography>
                    );
                  } else {
                    return jobs.filter((item) => item.id === selected)[0].title;
                  }
                },
                MenuProps: {
                  PaperProps: { style: { maxHeight: "250px" } },
                },
                IconComponent: KeyboardArrowDownIcon,
              }}
              value={controls.job}
              onChange={(e) => setControl("job", e.target.value)}
            >
              {jobs.map((item, index) => {
                return (
                  <MenuItem value={item.id} key={index}>
                    {item.title}
                  </MenuItem>
                );
              })}
            </TextField>
          </Grid>
          {/* <Grid item xs={2}>
            التابع له*
          </Grid>
          <Grid item xs={10}>
            <FormControl
              variant="standard"
              sx={{
                maxWidth: 500,
                width: "100%",
                "& .MuiInputBase-root": {
                  bgcolor: "white",
                  overflow: "hidden",
                },
              }}
            >
              <Select
                MenuProps={{ PaperProps: { style: { maxHeight: "250px" } } }}
                IconComponent={KeyboardArrowDownIcon}
                displayEmpty
                renderValue={(selected) => {
                  if (!selected) {
                    return (
                      <Typography
                        sx={{ color: "currentColor", opacity: "0.42" }}
                      >
                        محمد علي
                      </Typography>
                    );
                  } else {
                    console.log(selected.length);
                    return selected.replace(/\d/gi, "");
                  }
                }}
              >
                <MenuItem value="محمد علي">محمد علي</MenuItem>
              </Select>
            </FormControl>
          </Grid> */}
          {/* <Grid item xs={2}>
            قوائم الإنتظار*
          </Grid>
          <Grid item xs={10}>
            <FormControl
              variant="standard"
              sx={{
                maxWidth: 500,
                width: "100%",
                "& .MuiInputBase-root": {
                  bgcolor: "white",
                  overflow: "hidden",
                },
              }}
            >
              <Select
                MenuProps={{ PaperProps: { style: { maxHeight: "250px" } } }}
                IconComponent={KeyboardArrowDownIcon}
                displayEmpty
                renderValue={(selected) => {
                  if (!selected) {
                    return (
                      <Typography
                        sx={{ color: "currentColor", opacity: "0.42" }}
                      >
                        لا توجد قوائم إنتظار
                      </Typography>
                    );
                  } else {
                    console.log(selected.length);
                    return selected.replace(/\d/gi, "");
                  }
                }}
              ></Select>
            </FormControl>
          </Grid> */}
        </Grid>
      </DialogContent>
      <Divider variant="middle" sx={{ borderColor: "rgb(255 255 255 / 8%)" }} />
      <DialogTitle>صلاحيات الموظفين</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} columnSpacing={13}>
          <Grid
            item
            xs={12}
            sm={4}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            إضافة موظف
            <Switch defaultChecked />
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            حذف موظف
            <Switch defaultChecked />
          </Grid>
        </Grid>
      </DialogContent>
      <Divider variant="middle" sx={{ borderColor: "rgb(255 255 255 / 8%)" }} />
      <DialogTitle>صلاحيات العملاء</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} columnSpacing={13}>
          <Grid
            item
            xs={12}
            sm={4}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            إضافة عميل
            <Switch defaultChecked />
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            حذف عميل
            <Switch defaultChecked />
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            تعديل عميل
            <Switch defaultChecked />
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            إضافة حالة عميل
            <Switch defaultChecked />
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            حذف حالة عميل
            <Switch defaultChecked />
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            تعديل حالة عميل
            <Switch defaultChecked />
          </Grid>
        </Grid>
      </DialogContent>
      <Divider variant="middle" sx={{ borderColor: "rgb(255 255 255 / 8%)" }} />
      <DialogTitle>صلاحيات القنوات</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} columnSpacing={13}>
          <Grid
            item
            xs={12}
            sm={4}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            إضضافة قناة
            <Switch defaultChecked />
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            حذف قناة
            <Switch defaultChecked />
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            تعديل قناة
            <Switch defaultChecked />
          </Grid>
        </Grid>
      </DialogContent>
      <Divider variant="middle" sx={{ borderColor: "rgb(255 255 255 / 8%)" }} />
      <DialogContent>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={2}
        >
          <Button
            variant="outlined"
            sx={{
              color: "#fff",
              borderColor: "#fff",
              "&:hover": {
                borderColor: "#fff",
                color: "#fff",
              },
            }}
            onClick={sendData}
          >
            حفظ
          </Button>
          <Button variant="contained" color="error" onClick={onClose}>
            إلغاء
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default CustomersEditDialog;
