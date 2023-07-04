import React from "react";
import { useDispatch } from "react-redux";
import { cleanBoard, removeWinner } from "../features/boardSlice";

const WinnerCard = ({ winner }) => {
  const dispatch = useDispatch();

  if (winner === "draw")
    return (
      <div className="winner-card grid">
        <h1>Draw</h1>
        <button
          className="play-again-btn"
          onClick={() => {
            dispatch(cleanBoard());
            dispatch(removeWinner());
          }}
        >
          Play Again
        </button>
      </div>
    );

  return (
    <div className="winner-card grid">
      <h2>{winner === "red" ? "Player 1" : "Player 2"}</h2>
      <h1>Wins</h1>
      <button
        className="play-again-btn"
        onClick={() => {
          dispatch(cleanBoard());
          dispatch(removeWinner());
        }}
      >
        Play Again
      </button>
    </div>
  );
};

export default WinnerCard;
