import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Menu } from "@mui/material";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";

type IProps = {
  deleteCard: () => void;
  onUpdateTask: () => void;
};

export const CardMenu = ({ deleteCard, onUpdateTask }: IProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const deleteTaskHandler = () => {
    deleteCard();
    setAnchorEl(null);
  };
  const handleUpdateTask = () => {
    onUpdateTask();
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "20px",
          minWidth: "20px",
          height: "20px",
          borderRadius: "4px",
          padding: 0,
          color: "#000",
        }}
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreHorizIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleUpdateTask}>Редактировать</MenuItem>
        <MenuItem onClick={deleteTaskHandler}>Удалить</MenuItem>
      </Menu>
    </div>
  );
};
