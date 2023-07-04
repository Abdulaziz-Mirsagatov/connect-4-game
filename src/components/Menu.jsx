import React from "react";
import logo from "../assets/images/logo.svg";
import { goToGame, goToRules } from "../features/pagesSlice";
import { useDispatch } from "react-redux";
import MenuButton from "./MenuButton";

const Menu = () => {
  const dispatch = useDispatch();

  return (
    <div className="menu-wrapper grid">
      <section className="menu grid">
        <img src={logo} alt="logo" className="logo" />

        <div className="btn-group grid">
          <MenuButton
            text={"Play"}
            className="vs-player-btn"
            handleClick={() => dispatch(goToGame())}
          />
          <MenuButton
            text={"Game Rules"}
            handleClick={() => dispatch(goToRules())}
          />
        </div>
      </section>
    </div>
  );
};

export default Menu;
