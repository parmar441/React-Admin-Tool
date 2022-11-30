import {
  Box,
  IconButton,
  useTheme,
} from "@mui/material";
import React, { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Profile from "./Profile";
//import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
//import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
//import SearchIcon from "@mui/icons-material/Search";


const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [user] = useAuthState(auth);
if (user === null) return <></>;
  return (
    <Box display="flex" justifyContent="space-between" p={1}
      sx={{
        backgroundColor: colors.blueAccent[700],
      }}
    >
      <Box></Box>
      {/* SEARCH BAR */}
      {/* <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box> */}

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
        </IconButton>
        {/* <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton> */}

        {user != null && <Profile />}
      </Box>
    </Box>
  );
};

export default Topbar;
