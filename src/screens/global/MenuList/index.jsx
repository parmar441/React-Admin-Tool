import React from "react";
import MenuGroup from "./MenuGroup";

function MenuList({ menu }) {
  return (
    <>
      {/* <div>Menu List</div> */}
      {menu.map((item, index) => {
        return <MenuGroup group={item} />;
      })}
    </>
  );
}

export default MenuList;
