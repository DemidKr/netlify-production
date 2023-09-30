import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { PropsWithChildren } from "react";

interface IProps {
  title: string;
}

export const CardWithChart = ({
  title,
  children,
}: PropsWithChildren<IProps>) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      borderRadius="12px"
      border="1px solid rgba(24, 54, 100, 0.10)"
      width="min-content"
      bgcolor="white"
    >
      <Box
        px="12px"
        py="20px"
        bgcolor="rgba(24, 54, 100, 0.05)"
        textAlign="center"
      >
        <Typography
          component="h3"
          sx={{
            color: "#0D062D",
            fontFamily: "Inter",
            fontSize: "18px",
            fontStyle: "normal",
            fontWeight: "600",
            lineHeight: "normal",
          }}
        >
          {title}
        </Typography>
      </Box>

      <Box p="8px" pt="0">
        {children}
      </Box>
    </Box>
  );
};
