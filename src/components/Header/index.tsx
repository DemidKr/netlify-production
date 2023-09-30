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
        <Icon />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} pl="12px">
          Sprinter
        </Typography>

        <Box>
          <IconButton
            size="large"
            onClick={handleMenu}
            color="inherit"
            sx={{ padding: 0 }}
          >
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
