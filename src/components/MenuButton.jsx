import React from "react";

const MenuButton = ({
  text,
  className = "",
  handleClick,
}) => {
  return (
    <button
      className={"menu-btn " + className} // classes can be passed to give buttons special background color
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export default MenuButton;
