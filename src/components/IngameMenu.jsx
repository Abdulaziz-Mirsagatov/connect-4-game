import React from "react";
import { useDispatch } from "react-redux";
import { closeMenu } from "../features/ingameMenuSlice";
import { goToMenu } from "../features/pagesSlice";
import MenuButton from "./MenuButton";

const IngameMenu = ({ restartGame }) => {
  const dispatch = useDispatch();

  return (
    <div className="ingame-menu grid">
      <h1>Pause</h1>

      <div className="btn-group grid">
        <MenuButton
          text={"Continue Game"}
          handleClick={() => dispatch(closeMenu())}
        />
        <MenuButton text={"Restart"} handleClick={restartGame} />
        <MenuButton
          text={"Quit Game"}
          className="quit-btn"
          handleClick={() => {
            restartGame();
            dispatch(goToMenu());
          }}
        />
      </div>
    </div>
  );
};

export default IngameMenu;
