import React from "react";
import Box from "@mui/material/Box";

type IProps = {
  children: React.ReactNode;
};

export const DraggableColumnWrapper = ({ children }: IProps) => {
  return (
    <Box
      sx={{
        width: "354px",
        height: "fit-content",
        minHeight: "500px",
        borderRadius: "16px",
        background: "#F5F5F5",
        padding: "20px 20px 0  20px",
      }}
    >
      {children}
    </Box>
  );
};
