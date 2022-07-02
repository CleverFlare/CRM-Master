import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Grow,
  TextField,
} from "@mui/material";
import React from "react";
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
          height: "90vh",
          maxWidth: 1000,
          width: "90vw",
          overflowY: "auto",
        },
      }}
      BackdropProps={{
        sx: {
          bgcolor: "rgb(255 255 255 / 50%)",
        },
      }}
    >
      <DialogTitle>تعديل بيانات الموظفين</DialogTitle>
      <DialogContent sx={{ height: "max-content", flex: "unset" }}>
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
              defaultValue={initials.name}
              placeholder="الأسم"
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
              defaultValue={initials.email}
              placeholder="البريد الإلكتروني"
            />
          </Grid>
          <Grid item xs={2}>
            الوظيفة*
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
              defaultValue={initials.job}
              placeholder="الوظيفة"
            />
          </Grid>
          <Grid item xs={2}>
            التابع له*
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
              placeholder="التابع له"
            />
          </Grid>
          <Grid item xs={2}>
            قوائم الإنتظار*
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
              placeholder="قوائم الإنتظار"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <Divider variant="middle" sx={{ borderColor: "rgb(255 255 255 / 8%)" }} />
      <DialogTitle>العملاء</DialogTitle>
      <DialogTitle>الصفقات</DialogTitle>
      <DialogTitle>الملاك</DialogTitle>
    </Dialog>
  );
};

export default CustomersEditDialog;
