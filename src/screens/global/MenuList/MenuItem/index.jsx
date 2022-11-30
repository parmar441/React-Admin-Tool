import { Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MenuItem as ProMenuItem } from "react-pro-sidebar";

import { tokens } from "../../../../theme";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <ProMenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </ProMenuItem>
  );
};

function MenuItem({ menuItem }) {
  const [selected, setSelected] = useState();
  return (
    <Item title={menuItem.title} to={menuItem.to} icon={menuItem.icon} selected={selected} setSelected={setSelected} />
    //<div>Menu Item: { menuItem.title}</div>
  );
}

export default MenuItem;
