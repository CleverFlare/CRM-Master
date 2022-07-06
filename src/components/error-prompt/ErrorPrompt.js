import { Alert, Collapse, Dialog, Snackbar } from "@mui/material";

const ErrorPrompt = ({ children, open, sx }) => {
  return (
    <Collapse in={open} sx={sx}>
      <Alert severity="error">{children}</Alert>
    </Collapse>
  );
};

export default ErrorPrompt;
