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
