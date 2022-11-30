import { Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { tokens } from "../../../theme";

function Events() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="inherit">
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            color: colors.grey[100],
          }}
        >
          Events
        </Typography>
      </Box>
      <Box
        sx={{
          mt: "10px",
          height: "65vh",
        }}
      ></Box>
    </>
  );
}

export default Events;
