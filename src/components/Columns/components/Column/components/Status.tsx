import { FC } from "react";
import Box from "@mui/material/Box";
import { PRIORITIES_TASK, PRIORITY_ENUM } from "../../../../../entities";

type IProps = {
  status: PRIORITY_ENUM;
};

export const Status: FC<IProps> = ({ status }) => {
  const color = (status: PRIORITY_ENUM) => {
    switch (status) {
      case PRIORITY_ENUM.LOW:
        return {
          background: "rgba(131, 194, 157, 0.20)",
          color: "#68B266",
        };
      case PRIORITY_ENUM.MEDIUM:
        return {
          background: "rgba(223,193,116,0.2)",
          color: "#d5b949",
        };
      case PRIORITY_ENUM.HIGH:
        return {
          background: "rgba(223, 168, 116, 0.20)",
          color: "#D58D49",
        };
      case PRIORITY_ENUM.HOT:
        return {
          background: "rgba(216, 114, 125, 0.10)",
          color: "#D8727D",
        };
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "23px",
        padding: "0 6px",
        borderRadius: "4px",
        ...color(status),
        fontSize: "12px",
        fontFamily: "Inter",
        fontStyle: "normal",
        fontWeight: "500",
        lineHeight: "normal",
      }}
    >
      {PRIORITIES_TASK.find((x) => x.code === status)?.name}
    </Box>
  );
};
