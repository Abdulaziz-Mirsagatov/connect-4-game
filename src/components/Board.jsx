import React, { useRef } from "react";
import markerRed from "../assets/images/marker-red.svg";
import markerYellow from "../assets/images/marker-yellow.svg";
import { useSelector } from "react-redux";
import { selectBoard, selectTurn } from "../features/boardSlice";
import Disk from "./Disk";
import BoardButtons from "./BoardButtons";

const Board = ({ interval }) => {
  const board = useSelector((state) => selectBoard(state));
  const turn = useSelector((state) => selectTurn(state));
  const turnMarkerElement = useRef();

  // function to adjust the marker's position above the column being hovered on
  const moveTurnMarker = (column) => {
    const left = (20 + 69.7 * column) / 16;
    turnMarkerElement.current.style.left = left + "rem";
  };

  return (
    <div className="board">
      <img
        src={turn === "red" ? markerRed : markerYellow}
        alt="turn marker"
        className="turn-marker"
        ref={turnMarkerElement}
      />

      {/* render disks on the board */}
      {board.map((column, i) =>
        column.map((cell, j) => {
          if (cell)
            return <Disk key={[i, j]} coordinate={[i, j]} color={cell} />;
        })
      )}

      <div className="board-layers grid">
        <BoardButtons
          handleMouseOver={(column) => moveTurnMarker(column)}
          interval={interval}
        />
        <div className="black-layer"></div>
        <div className="white-layer"></div>
      </div>
    </div>
  );
};

export default Board;
