import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";

type IProps = {
  setShowAddTaskButton: () => void;
};

export const AddButton = ({ setShowAddTaskButton }: IProps) => {
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
      onClick={setShowAddTaskButton}
    >
      <AddIcon sx={{ color: "#5030E5", width: "16px", height: "16px" }} />
    </Button>
  );
};
