import { Dispatch, FC, SetStateAction } from "react";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";

type IProps = {
  setShowAddTaskButton: Dispatch<SetStateAction<boolean>>;
};

export const AddButton: FC<IProps> = ({ setShowAddTaskButton }) => {
  return (
    <Button
      variant="contained"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#d3cdf1",
        width: "20px",
        minWidth: "20px",
        height: "20px",
        borderRadius: "4px",
        padding: 0,
        "&:hover": {
          background: "#bbb3e8",
        },
      }}
      onClick={() => setShowAddTaskButton(true)}
    >
      <AddIcon sx={{ color: "#5030E5", width: "16px", height: "16px" }} />
    </Button>
  );
};
