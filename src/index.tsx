import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import CssBaseline from "@mui/material/CssBaseline";

import { App } from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

const theme = createTheme({
  palette: {
    primary: {
      main: "#3454D1",
    },
    secondary: {
      main: "rgba(216, 232, 255, 0.25)",
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
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <React.StrictMode>
          <App />
          <CssBaseline />
        </React.StrictMode>
      </LocalizationProvider>
    </ThemeProvider>
  </BrowserRouter>,
);
