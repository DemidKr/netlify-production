import { Box, CssBaseline, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import Button from "@mui/material/Button";

export const Login = () => {
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogin = () => {
    setIsLoading(true);

    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <Grid
      container
      component="main"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100vh",
        backgroundImage:
          "url(https://images.unsplash.com/photo-1517502884422-41eaead166d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2525&q=80)",
        backgroundRepeat: "no-repeat",

        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <CssBaseline />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",
          backgroundColor: "#FFF",
          borderRadius: "22px",
          padding: "22px",
        }}
      >
        <Typography
          component="div"
          sx={{
            fontFamily: "Inter",
            fontSize: "48px",
            fontStyle: "normal",
            fontWeight: "700",
            lineHeight: "normal",
            textTransform: "uppercase",
          }}
        >
          Логин
        </Typography>
        <TextField
          label="Логин"
          inputProps={{ autoComplete: "off" }}
          value={username}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setUsername(event.target.value)
          }
          sx={{
            width: "390px",
            "& label": {
              fontFamily: "Inter",
              fontWeight: "500",
            },
            "& .MuiInputBase-root": {
              fontFamily: "Inter",
              fontWeight: "500",
            },
          }}
        />
        <TextField
          label="Пароль"
          inputProps={{ autoComplete: "off" }}
          value={password}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(event.target.value)
          }
          sx={{
            width: "390px",
            "& label": {
              fontFamily: "Inter",
              fontWeight: "500",
            },
            "& .MuiInputBase-root": {
              fontFamily: "Inter",
              fontWeight: "500",
            },
          }}
        />
        <Button disabled={isLoading} onClick={handleLogin} variant="contained">
          Войти
        </Button>
      </Box>
    </Grid>
  );
};
