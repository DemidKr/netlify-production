import { useState } from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import Toolbar from "@mui/material/Toolbar";

import api from "../../utils/axios";
import { getUserRoleNameById } from "../../utils/helpers";
import { Icon } from "./icon";
import { BackgroundLetterAvatars } from "../BackgroundLetterAvatars";

interface IProps {
  isManagerMode?: boolean;
}

export const Header = ({ isManagerMode }: IProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const currentUser = JSON.parse(localStorage.getItem("user") ?? "{}");
  const navigate = useNavigate();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    api()
      .get("/user/logout")
      .then(() => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");
        // eslint-disable-next-line no-restricted-globals
        location.reload();
      });
  };

  const handleGoStats = () => {
    navigate("/stats");
  };

  const handleGoManagment = () => {
    navigate(isManagerMode ? "/management" : "/tasks");
  };

  return (
    <AppBar
      position="static"
      color="secondary"
      sx={{
        height: "62px",
        boxShadow:
          "0px 2px 4px -1px rgba(0,0,0,0.01), 0px 4px 5px 0px rgba(0,0,0,0.05), 0px 1px 10px 0px rgba(0,0,0,0.1)",
      }}
    >
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Icon />
          <Typography
            variant="h6"
            px="12px"
            onClick={handleGoManagment}
            sx={{
              cursor: "pointer",
            }}
          >
            Sprinter
          </Typography>
          <Typography
            variant="h6"
            textTransform="lowercase"
            sx={{ display: { xs: "none", md: "block" } }}
          >
            Я {getUserRoleNameById(currentUser?.role_id)}
          </Typography>
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "flex-end",
            mr: "24px",
          }}
        >
          {isManagerMode && (
            <Typography onClick={handleGoStats}>Статистика</Typography>
          )}
        </Box>

        <Box>
          <IconButton
            size="large"
            onClick={handleMenu}
            color="inherit"
            sx={{ padding: 0 }}
          >
            <BackgroundLetterAvatars
              firstName={currentUser?.first_name}
              secondName={currentUser?.second_name}
            />
          </IconButton>

          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleLogout}>Выход</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
