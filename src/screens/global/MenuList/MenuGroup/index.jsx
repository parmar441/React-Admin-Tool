import React from "react";
import MenuCollapse from "../MenuCollapse";
import MenuItem from "../MenuItem";

function MenuGroup({ group }) {
  return (
    <>
      <div>Menu Group: {group.title}</div>
      {group.children.map((item, index) => {
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

export default MenuGroup;
