import React, { useState } from "react";
import type { AxiosResponse } from "axios";
import { Box, Grid, useMediaQuery } from "@mui/material";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import api from "../../utils/axios";
import { IUser } from "../../entities/user";

export const Login = () => {
  const isDesktop = useMediaQuery("(min-width:600px)");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogin = () => {
    setIsLoading(true);
    api()
      .post("/login", {
        email: username,
        password,
      })
      .then((body: AxiosResponse<IUser>) => {
        if (body?.data) {
          localStorage.setItem("access_token", body.data?.api_token ?? "");
          localStorage.setItem("user", JSON.stringify(body.data));
          // eslint-disable-next-line no-restricted-globals
          location.reload();
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
          backgroundColor: "#FFF",
          borderRadius: "22px",
          padding: "22px",
        }}
      >
        <Typography
          component="div"
          sx={{
            fontFamily: "Inter",
            fontSize: "36px",
            fontStyle: "normal",
            fontWeight: "500",
            lineHeight: "normal",
          }}
        >
          Вход в аккаунт
        </Typography>

        <TextField
          label="Логин"
          value={username}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setUsername(event.target.value)
          }
          sx={{
            width: isDesktop ? "390px" : "70%",
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
          value={password}
          type="password"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(event.target.value)
          }
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleLogin();
            }
          }}
          sx={{
            width: isDesktop ? "390px" : "70%",
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
