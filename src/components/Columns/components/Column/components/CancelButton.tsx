import { FC } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";

type IProps = {
  cancel: () => void;
};

export const CancelButton: FC<IProps> = ({ cancel }) => {
  return (
    <Button
      variant="contained"
      color="error"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "20px",
        minWidth: "20px",
        height: "20px",
        borderRadius: "4px",
        padding: 0,
      }}
      onClick={cancel}
    >
      <CloseIcon sx={{ color: "#5b1818", width: "16px", height: "16px" }} />
    </Button>
  );
};
