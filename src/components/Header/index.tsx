import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import Toolbar from "@mui/material/Toolbar";

import api from "../../utils/axios";
import { Icon } from "./icon";
import { BackgroundLetterAvatars } from "../BackgroundLetterAvatars";

export const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    api().get("/user/logout");
  };

  return (
    <AppBar position="static" sx={{ height: "62px" }}>
      <Toolbar>
        <Icon />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} pl="12px">
          Task Manager
        </Typography>

        <Box>
          <IconButton size="large" onClick={handleMenu} color="inherit">
            <BackgroundLetterAvatars firstName="Тест" secondName="Иван" />
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
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
