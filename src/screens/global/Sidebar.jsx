import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import RegisterIcon from "@mui/icons-material/Login";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsIcon from "@mui/icons-material/ContactsOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import LoginIcon from "@mui/icons-material/Login";
import { Stack } from "@mui/system";

import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [user] = useAuthState(auth);

  if (user === null) return <></>;

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Stack>
                  <Typography variant="h2" color={colors.grey[100]}>
                    mEMDA
                  </Typography>
                </Stack>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && user != null && (
            <Box mb="25px" ml="30px">
              <Box textAlign="left">
                <Typography
                  variant="h4"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {user.displayName === null ? user.email : user.displayName}
                </Typography>
              </Box>
            </Box>
          )}

          {user != null && (
            <Box paddingLeft={isCollapsed ? undefined : "10%"}>
              {/* <Item title="Dashboard" to="/" icon={<HomeOutlinedIcon />} selected={selected} setSelected={setSelected} /> */}
              <Item
                title="Participants"
                to="/users"
                icon={<ContactsIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Invites"
                to="/invites"
                icon={<PeopleOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              {/* <Item title="Admin List" to="/admins" icon={<HomeOutlinedIcon />} selected={selected} setSelected={setSelected} /> */}
              {/* <MenuList menu={menus} /> */}
            </Box>
          )}

          {user == null && (
            <Box paddingLeft={isCollapsed ? undefined : "10%"}>
              <Item
                title="Login"
                to="/login"
                icon={<LoginIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Register"
                to="/register"
                icon={<RegisterIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </Box>
          )}
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
