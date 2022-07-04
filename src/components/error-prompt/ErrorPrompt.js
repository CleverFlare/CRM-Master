import { Alert, Collapse, Dialog, Snackbar } from "@mui/material";
import { useEffect } from "react";
import Wrapper from "../wrapper/Wrapper";

const ErrorPrompt = ({ children, open, onClose, sx }) => {
  // useEffect(() => {
  //   if (open) {
  //     setTimeout(() => {
  //       onClose();
  //     }, 1000);
  //   }
  // }, [open]);
  return (
    <Collapse in={open} sx={sx}>
      <Alert severity="error">{children}</Alert>
    </Collapse>
  );
};

export default ErrorPrompt;
