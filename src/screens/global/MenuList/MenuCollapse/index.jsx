import React from "react";
import MenuItem from "../MenuItem";

function MenuCollapse({ collapse }) {
  return (
    <>
      <div>Menu Collapse: {collapse.title}</div>
      {collapse.children.map((item, index) => {
        if (item.type === "collapse") {
          return <MenuCollapse collapse={item} />;
        } else if (item.type === "item") {
          return <MenuItem menuItem={item} />;
        }
        return null;
      })}
    </>
  );
}

export default MenuCollapse;
