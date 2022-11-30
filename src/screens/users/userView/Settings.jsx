import { Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { tokens } from "../../../theme";

function Settings() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box>
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{
          color: colors.grey[100],
        }}
      >
        Settings
      </Typography>
    </Box>
  );
}

export default Settings;
