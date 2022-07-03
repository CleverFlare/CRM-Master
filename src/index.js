import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material";
import theme, { cacheRtl } from "./theme";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CacheProvider value={cacheRtl}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </CacheProvider>
);
