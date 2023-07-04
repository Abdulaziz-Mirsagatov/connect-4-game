import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addDisk,
  selectTurn,
  selectWinner,
  setWinner,
} from "../features/boardSlice";
import {
  decreaseTimePlayer1,
  decreaseTimePlayer2,
  restartTime,
  selectPlayer1,
} from "../features/playersSlice";

const BoardButtons = ({ handleMouseOver, interval }) => {
  const turn = useSelector((state) => selectTurn(state));
  const player1 = useSelector((state) => selectPlayer1(state));
  const winner = useSelector((state) => selectWinner(state));
  const time = useRef();

  const dispatch = useDispatch();

  const handleClick = (column) => {
    // if winner is already decided, do nothing
    if (winner) return;

    if (interval.current) clearInterval(interval.current);
    time.current = player1.time;

    // Set up an interval that decreases the timer by 1 each second until 0
    if (turn === "red") {
      interval.current = setInterval(() => {
        if (time.current > 0) {
          dispatch(decreaseTimePlayer2());
          time.current -= 1;
        } else dispatch(setWinner("red"));
      }, 1000);
    } else {
      interval.current = setInterval(() => {
        if (time.current > 0) {
          dispatch(decreaseTimePlayer1());
          time.current -= 1;
        } else dispatch(setWinner("yellow"));
      }, 1000);
    }

    dispatch(restartTime());
    dispatch(addDisk(column));
  };

  let boardButtons = [];
  for (let row = 0; row < 6; row++)
    for (let column = 0; column < 7; column++)
      boardButtons.push(
        <button
          key={[row, column]}
          className="board-btn"
          onClick={() => handleClick(column)}
          onMouseOver={() => handleMouseOver(column)}
        ></button>
      );

  return boardButtons;
};

export default BoardButtons;
