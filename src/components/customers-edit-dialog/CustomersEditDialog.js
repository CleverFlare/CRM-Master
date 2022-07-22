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
  Box,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import axios from "axios";
import usePatch from "../../hooks/usePatch";
import { useSelector } from "react-redux";
import useControls from "../../hooks/useControls";
import useGet from "../../hooks/useGet";
import { useDispatch } from "react-redux";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Grow direction="up" ref={ref} {...props} unmountOnExit />;
});

const CustomersEditDialog = ({ isOpened, onClose, initials }) => {
  const [permissionsState, setPermissionsState] = useState([]);
  const jobs = useSelector((state) => state.jobs.value);
  const [controls, setControl, resetControls] = useControls({
    name: "",
    email: "",
    job: "",
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
      user: {},
    };
    if (Boolean(controls.name)) {
      requestBody.user.first_name = controls.name.split(" ")[0];
      requestBody.user.last_name = controls.name.split(" ")[1]
        ? controls.name.split(" ")[1]
        : "";
    }
    Boolean(controls.email) && (requestBody.user.email = controls.email);
    Boolean(controls.job) && (requestBody.job = controls.job);
    Boolean(permissionsState?.length) &&
      (requestBody.user.user_permissions = permissionsState.map(
        (permission) => ({ codename: permission })
      ));
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

  useEffect(() => {
    if (isOpened) {
      setPermissionsState(initials?.perms);
    }
  }, [isOpened]);

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
    <Dialog
      open={isOpened}
      onClose={(e) => {
        setPermissionsState([]);
        onClose(e);
      }}
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
              onChange={(e) => {
                const jobPerms = jobs
                  .filter((job) => job.id === e.target.value)[0]
                  .permissions.map((perm) => perm.codename);
                setPermissionsState(jobPerms);
                setControl("job", e.target.value);
              }}
            >
              {jobs &&
                jobs.map((item, index) => {
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
      <DialogTitle>صلاحيات المنشورات</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} columnSpacing={13}>
          <Grid
            item
            xs={12}
            sm={4}
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            إضافة منشور
            <Switch
              value="add_aqarpost"
              onChange={handleTogglePermission}
              checked={permissionsState.includes("add_aqarpost")}
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
            حذف منشور
            <Switch
              value="delete_aqarpost"
              onChange={handleTogglePermission}
              checked={permissionsState.includes("delete_aqarpost")}
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
            عرض المنشورات
            <Switch
              value="view_aqarpost"
              onChange={handleTogglePermission}
              checked={permissionsState.includes("view_aqarpost")}
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
            تعديل منشور
            <Switch
              value="change_aqarpost"
              onChange={handleTogglePermission}
              checked={permissionsState.includes("change_aqarpost")}
            />
          </Grid>
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
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            إضافة موظف
            <Switch
              value="add_aqaremployee"
              onChange={handleTogglePermission}
              checked={permissionsState.includes("add_aqaremployee")}
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
            حذف موظف
            <Switch
              value="delete_aqaremployee"
              onChange={handleTogglePermission}
              checked={permissionsState.includes("delete_aqaremployee")}
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
            عرض الموظفين
            <Switch
              value="view_aqaremployee"
              onChange={handleTogglePermission}
              checked={permissionsState.includes("view_aqaremployee")}
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
            تعديل موظف
            <Switch
              value="change_aqaremployee"
              onChange={handleTogglePermission}
              checked={permissionsState.includes("change_aqaremployee")}
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
            إضافة وظيفة
            <Switch
              value="add_aqarjob"
              onChange={handleTogglePermission}
              checked={permissionsState.includes("add_aqarjob")}
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
            حذف وظيفة
            <Switch
              value="delete_aqarjob"
              onChange={handleTogglePermission}
              checked={permissionsState.includes("delete_aqarjob")}
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
            عرض وظيفة
            <Switch
              value="view_aqarjob"
              onChange={handleTogglePermission}
              checked={permissionsState.includes("view_aqarjob")}
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
            تعديل وظيفة
            <Switch
              value="change_aqarjob"
              onChange={handleTogglePermission}
              checked={permissionsState.includes("change_aqarjob")}
            />
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
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            إضافة عميل
            <Switch
              value="add_aqarclient"
              onChange={handleTogglePermission}
              checked={permissionsState.includes("add_aqarclient")}
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
            حذف عميل
            <Switch
              value="delete_aqarclient"
              onChange={handleTogglePermission}
              checked={permissionsState.includes("delete_aqarclient")}
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
            عرض العملاء
            <Switch
              value="view_aqarclient"
              onChange={handleTogglePermission}
              checked={permissionsState.includes("view_aqarclient")}
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
            تعديل العملاء
            <Switch
              value="change_aqarclient"
              onChange={handleTogglePermission}
              checked={permissionsState.includes("change_aqarclient")}
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
            إضافة حالة عميل
            <Switch
              value="add_aqarevent"
              onChange={handleTogglePermission}
              checked={permissionsState.includes("add_aqarevent")}
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
            حذف حالة عميل
            <Switch
              value="delete_aqarevent"
              onChange={handleTogglePermission}
              checked={permissionsState.includes("delete_aqarevent")}
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
            تعديل حالة عميل
            <Switch
              value="change_aqarevent"
              onChange={handleTogglePermission}
              checked={permissionsState.includes("change_aqarevent")}
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
            عرض حالة العملاء
            <Switch
              value="view_aqarevent"
              onChange={handleTogglePermission}
              checked={permissionsState.includes("view_aqarevent")}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <Divider variant="middle" sx={{ borderColor: "rgb(255 255 255 / 8%)" }} />
      <DialogTitle>صلاحيات المشاريع</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} columnSpacing={13}>
          <Grid
            item
            xs={12}
            sm={4}
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            إضافة مشروع
            <Switch
              value="add_aqarproject"
              onChange={handleTogglePermission}
              checked={permissionsState.includes("add_aqarproject")}
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
            حذف مشروع
            <Switch
              value="delete_aqarproject"
              onChange={handleTogglePermission}
              checked={permissionsState.includes("delete_aqarproject")}
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
            عرض المشاريع
            <Switch
              value="view_aqarproject"
              onChange={handleTogglePermission}
              checked={permissionsState.includes("view_aqarproject")}
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
            تعديل مشروع
            <Switch
              value="change_aqarproject"
              onChange={handleTogglePermission}
              checked={permissionsState.includes("change_aqarproject")}
            />
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
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            إضافة قناة
            <Switch
              value="add_aqarchannel"
              onChange={handleTogglePermission}
              checked={permissionsState.includes("add_aqarchannel")}
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
            حذف قناة
            <Switch
              value="delete_aqarchannel"
              onChange={handleTogglePermission}
              checked={permissionsState.includes("delete_aqarchannel")}
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
            عرض القنوات
            <Switch
              value="view_aqarchannel"
              onChange={handleTogglePermission}
              checked={permissionsState.includes("view_aqarchannel")}
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
            تعديل قناة
            <Switch
              value="change_aqarchannel"
              onChange={handleTogglePermission}
              checked={permissionsState.includes("change_aqarchannel")}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <Divider variant="middle" sx={{ borderColor: "rgb(255 255 255 / 8%)" }} />
      <DialogTitle>صلاحيات المسؤول</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} columnSpacing={13}>
          <Grid
            item
            xs={12}
            sm={4}
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            الحصول على صلاحيات المسؤول
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
                    return setPermissionsState([]);
                }
              }}
            />
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
