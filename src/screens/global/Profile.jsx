import React, { Fragment, useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  ClickAwayListener,
  IconButton,
  Paper,
  Popper,
  useTheme,
} from "@mui/material";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { useNavigate } from "react-router-dom";

import { logout } from "../../firebase";
import { tokens } from "../../theme";

export default function Profile() {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleLogout = async () => {
    logout();
    navigate("/login");
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const card = (
    <Fragment>
      <CardContent></CardContent>
      <CardActions>
        <Button
          size="medium"
          onClick={handleLogout}
          sx={{
            backgroundColor: colors.greenAccent[600],
            color: colors.primary[100],
            "&:hover": {
              backgroundColor: colors.greenAccent[700],
              color: colors.primary[200],
            },
          }}
        >
          Logout
        </Button>
      </CardActions>
    </Fragment>
  );

  return (
    <>
      <IconButton ref={anchorRef} onClick={handleToggle}>
        <PersonOutlinedIcon />
      </IconButton>
      <Popper
        style={{ zIndex: 10000 }}
        placement="bottom-start"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        //disablePortal
        popperOptions={{
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, 14],
              },
            },
          ],
        }}
      >
        <Paper>
          <ClickAwayListener onClickAway={handleClose}>
            <Box sx={{ minWidth: 275 }}>
              <Card variant="outlined">
                <Box>{card}</Box>
              </Card>
            </Box>
          </ClickAwayListener>
        </Paper>
      </Popper>
    </>
  );
}
