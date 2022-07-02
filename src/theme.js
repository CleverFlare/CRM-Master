import { createTheme } from "@mui/material";
import rtlPlugin from "stylis-plugin-rtl";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";

const theme = createTheme({
  palette: {
    primary: {
      main: "#233975",
      light: "#2d4997",
      dark: "#1a2a56",
    },
    neutral: {
      main: "#5b6071",
      light: "#7e859b",
      dark: "#474a56",
    },
  },
  components: {
    MuiCardHeader: {
      styleOverrides: {
        avatar: {
          marginInline: "0 16px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        endIcon: {
          marginInline: "8px -4px",
        },
      },
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiTextField: {
      defaultProps: {
        InputLabelProps: {
          shrink: true,
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          border: "1px solid #00000021",
          borderRadius: 5,
        },
        input: {
          paddingInline: 10,
        },
      },
      defaultProps: {
        disableUnderline: true,
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontWeight: "bold",
          transform: "translate(0, -5.5px) scale(0.75)",
        },
      },
    },
  },
  typography: {
    fontFamily: "'Cairo', sans-serif",
  },
});

export const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

export default theme;
