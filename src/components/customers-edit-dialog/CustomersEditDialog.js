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
import React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Grow direction="up" ref={ref} {...props} />;
});

const CustomersEditDialog = ({ isOpened, onClose, initials }) => {
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
            />
          </Grid>
          <Grid item xs={2}>
            الوظيفة*
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
                        {initials.job}
                      </Typography>
                    );
                  } else {
                    console.log(selected.length);
                    return selected.replace(/\d/gi, "");
                  }
                }}
              >
                <MenuItem value="مندوب مبيعات">مندوب مبيعات</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={2}>
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
          </Grid>
          <Grid item xs={2}>
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
          </Grid>
        </Grid>
      </DialogContent>
      <Divider variant="middle" sx={{ borderColor: "rgb(255 255 255 / 8%)" }} />
      <DialogTitle>العملاء</DialogTitle>
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
            عميل الإستيراد
            <Switch defaultChecked />
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            مدخلات العميل
            <Switch defaultChecked />
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            اظهر مدخلات البيانات
            <Switch defaultChecked />
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            إلغاء تعديل صفحة العميل
            <Switch defaultChecked />
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            تعديل الهاتف
            <Switch defaultChecked />
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            تقود الجيل
            <Switch defaultChecked />
          </Grid>
        </Grid>
      </DialogContent>
      <Divider variant="middle" sx={{ borderColor: "rgb(255 255 255 / 8%)" }} />
      <DialogTitle>الصفقات</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} columnSpacing={13}>
          <Grid
            item
            xs={12}
            sm={4}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            الصفقات
            <Switch defaultChecked />
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            طلب صفقة
            <Switch defaultChecked />
          </Grid>
        </Grid>
      </DialogContent>
      <Divider variant="middle" sx={{ borderColor: "rgb(255 255 255 / 8%)" }} />
      <DialogTitle>الملاك</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} columnSpacing={13}>
          <Grid
            item
            xs={12}
            sm={4}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            المالك
            <Switch defaultChecked />
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            جميع الملاك
            <Switch defaultChecked />
          </Grid>
        </Grid>
      </DialogContent>
      <Divider variant="middle" sx={{ borderColor: "rgb(255 255 255 / 8%)" }} />
      <DialogTitle>التقارير</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} columnSpacing={13}>
          <Grid
            item
            xs={12}
            sm={4}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            تقرير المبيعات
            <Switch defaultChecked />
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            استدعاء التقرير
            <Switch defaultChecked />
          </Grid>
        </Grid>
      </DialogContent>
      <Divider variant="middle" sx={{ borderColor: "rgb(255 255 255 / 8%)" }} />
      <DialogTitle>الوحدة</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} columnSpacing={13}>
          <Grid
            item
            xs={4}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            إضافة وحدة
            <Switch defaultChecked />
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            تصدير وحدة
            <Switch defaultChecked />
          </Grid>
        </Grid>
      </DialogContent>
      <Divider variant="middle" sx={{ borderColor: "rgb(255 255 255 / 8%)" }} />
      <DialogTitle>أخرى</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} columnSpacing={13}>
          <Grid
            item
            xs={12}
            sm={4}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            مشاريعي
            <Switch defaultChecked />
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            اضف إجراء على الأعضاء
            <Switch defaultChecked />
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            السماح بنسخ النص
            <Switch defaultChecked />
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            ملاحظات المبيعات
            <Switch defaultChecked />
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            طلب الحجز
            <Switch defaultChecked />
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            مخطط افضل بائع
            <Switch defaultChecked />
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            مخطط افضل عمل
            <Switch defaultChecked />
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            شركة مطورة
            <Switch defaultChecked />
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            تعليقات الجودة
            <Switch defaultChecked />
          </Grid>
        </Grid>
      </DialogContent>
      <Divider variant="middle" sx={{ borderColor: "rgb(255 255 255 / 8%)" }} />
      <DialogTitle>وحدات التحكم</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} columnSpacing={13}>
          <Grid
            item
            xs={12}
            sm={4}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            تعيين
            <Switch defaultChecked />
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            تصدير
            <Switch defaultChecked />
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            رسالة نصية
            <Switch defaultChecked />
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            البريد الإلكتروني
            <Switch defaultChecked />
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            استيراد
            <Switch defaultChecked />
          </Grid>
        </Grid>
      </DialogContent>
      <Divider variant="middle" sx={{ borderColor: "rgb(255 255 255 / 8%)" }} />
      <DialogTitle>الحساب</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} columnSpacing={13}>
          <Grid
            item
            xs={12}
            sm={4}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            نشط
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
