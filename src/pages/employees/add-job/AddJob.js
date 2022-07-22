import {
  Stack,
  Paper,
  TextField,
  useMediaQuery,
  Button,
  Alert,
  Snackbar,
  Box,
  Grid,
  Switch,
  Typography,
} from "@mui/material";
import { useState } from "react";
import Parameter from "../../../components/parameter/Parameter";
import Wrapper from "../../../components/wrapper/Wrapper";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import useValidate from "../../../hooks/useValidate";
import usePost from "../../../hooks/usePost";
import useControls from "../../../hooks/useControls";

const AddJob = () => {
  const sm = useMediaQuery("(min-width: 896px)");
  const [permissionsState, setPermissionsState] = useState([]);
  const [errors, setErrors] = useState({});
  const validate = useValidate();
  const [controls, setControl, resetControls] = useControls({
    name: "",
  });

  const handleSuccess = () => {
    setPermissionsState([]);
    resetControls();
  };

  const [postRequest, errorAlert, successAlert, isPending] = usePost(
    "aqar/api/router/Job/",
    "وظيفة جديد تم إضافتها!",
    handleSuccess
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    validate([
      {
        name: "name",
        value: controls.name,
        isRequired: true,
      },
    ]).then((output) => {
      setErrors(output.errors);
      if (!output.ok) return;
      const requestBody = {
        title: controls.name,
        organization: 1,
        permissions: permissionsState.map((permission) => ({
          codename: permission,
        })),
      };
      postRequest(requestBody, true, "jobs");
    });
  };

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
    <Wrapper>
      <Parameter links={[{ text: "الموظفين" }, { text: "إضافة وظيفة" }]} />
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <Stack
          sx={{
            width: "100%",
          }}
          justifyContent="center"
          alignItems="center"
          spacing={4}
        >
          <Paper
            sx={{
              padding: sm ? 2 : 0,
              width: "100%",
              boxSizing: "border-box",
              boxShadow: sm ? "inherit" : "none",
            }}
          >
            <Stack spacing={2}>
              <TextField
                variant="standard"
                label="الوظيفة"
                placeholder="الوظيفة"
                sx={{
                  width: "100%",
                  maxWidth: 600,
                }}
                error={Boolean(errors?.name)}
                helperText={errors?.name}
                value={controls.name}
                onChange={(event) => setControl("name", event.target.value)}
              />
              <Box>
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
                      صلاحيات المنشورات
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
                  <Grid
                    item
                    sm={12}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      صلاحيات الموظفين
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
                      صلاحيات العملاء
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
                      صلاحيات المشاريع
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
                      صلاحيات القنوات
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
                      صلاحيات المسؤول
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
              </Box>
            </Stack>
          </Paper>
          <Button
            variant="contained"
            type="submit"
            sx={{ maxWidth: 150, width: "100%", height: 45 }}
            disabled={isPending}
          >
            حفظ
          </Button>
        </Stack>
      </form>
      {errorAlert}
      {successAlert}
    </Wrapper>
  );
};

export default AddJob;
