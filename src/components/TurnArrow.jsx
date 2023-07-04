import React from "react";
import turnBackgroundRed from "../assets/images/turn-background-red.svg";
import turnBackgroundYellow from "../assets/images/turn-background-yellow.svg";
import { useSelector } from "react-redux";
import { selectTurn } from "../features/boardSlice";
import { selectPlayer1, selectPlayer2 } from "../features/playersSlice";

const TurnArrow = () => {
  const turn = useSelector((state) => selectTurn(state));
  const player1 = useSelector((state) => selectPlayer1(state));
  const player2 = useSelector((state) => selectPlayer2(state));

  if (turn === "red")
    return (
      <div
        className="turn grid"
        style={{
          backgroundImage: `url(${turnBackgroundRed})`,
        }}
      >
        <h1>Player 1's turn</h1>
        <p className="time">{player1.time}s</p>
      </div>
    );
  else
    return (
      <div
        className="turn grid"
        style={{
          backgroundImage: `url(${turnBackgroundYellow})`,
        }}
      >
        <h1>Player 2's turn</h1>
        <p className="time">{player2.time}s</p>
      </div>
    );
};

export default TurnArrow;
