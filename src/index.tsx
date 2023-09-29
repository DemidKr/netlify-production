import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";

import { App } from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

const theme = createTheme({
  palette: {
    primary: {
      main: "#3454D1",
    },
    action: {
      hover: "#F9FAFE",
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        h1: {
          fontSize: "2em",
          fontWeight: "bold",
        },
        h2: {
          fontSize: "1.3em",
          fontWeight: "bold",
        },
        h3: {
          fontSize: "1.2em",
          fontWeight: "bold",
        },
        h4: {
          fontSize: "1em",
          fontWeight: "bold",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: "bold",
        },
      },
    },
  },
});

root.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ThemeProvider>
  </BrowserRouter>,
);
