import React, { useEffect, useRef } from "react";
import player1Emoji from "../assets/images/player-one.svg";
import player2Emoji from "../assets/images/player-two.svg";
import logo from "../assets/images/logo.svg";
import Board from "./Board.jsx";
import IngameMenu from "./IngameMenu.jsx";
import { useSelector, useDispatch } from "react-redux";
import {
  selectIngameMenu,
  openMenu,
  closeMenu,
} from "../features/ingameMenuSlice";
import {
  increasePlayerScore1,
  increasePlayerScore2,
  reinitializePlayers,
  selectPlayer1,
  selectPlayer2,
} from "../features/playersSlice.jsx";
import {
  changeStartingPlayer,
  cleanBoard,
  removeWinner,
  selectBoard,
  selectWinner,
  setWinner,
} from "../features/boardSlice.jsx";
import TurnArrow from "./TurnArrow.jsx";
import WinnerCard from "./WinnerCard";

const Game = () => {
  const isIngameMenuActive = useSelector((state) => selectIngameMenu(state));
  const player1 = useSelector((state) => selectPlayer1(state));
  const player2 = useSelector((state) => selectPlayer2(state));
  const board = useSelector((state) => selectBoard(state));
  const winner = useSelector((state) => selectWinner(state));
  // stores id of ongoing player timer
  const interval = useRef();

  const dispatch = useDispatch();

  const restartGame = () => {
    if (interval.current) clearInterval(interval.current);
    dispatch(reinitializePlayers());
    dispatch(cleanBoard());
    dispatch(removeWinner());
    dispatch(closeMenu());
  };

  // If winner is decided delete existing timer and increase winner score
  useEffect(() => {
    if (winner && interval.current) {
      dispatch(changeStartingPlayer());
      clearInterval(interval.current);
    }
    if (winner === "red") dispatch(increasePlayerScore1());
    else if (winner === "yellow") dispatch(increasePlayerScore2());
  }, [winner]);

  // Every time a disk is added to the board, check for stalemate condition
  useEffect(() => {
    if (!board.some((column) => column.some((cell) => !cell)))
      dispatch(setWinner("draw"));
  }, [board]);

  return (
    <div className="game-wrapper grid">
      <main className="main grid">
        <div className="top-menu flex">
          <button className="ingame-btn" onClick={() => dispatch(openMenu())}>
            Menu
          </button>
          <img src={logo} alt="logo" />
          <button className="ingame-btn" onClick={() => restartGame()}>
            Restart
          </button>
        </div>

        <div className="player-card player1 grid">
          <img src={player1Emoji} alt="player emoji" />
          <h1>Player 1</h1>
          <p className="score">{player1.score}</p>
        </div>
        <div className="player-card player2 grid">
          <img src={player2Emoji} alt="player emoji" />
          <h1>Player 2</h1>
          <p className="score">{player2.score}</p>
        </div>

        <Board interval={interval} />
        {winner ? <WinnerCard winner={winner} /> : <TurnArrow />}

        {isIngameMenuActive && (
          <>
            <IngameMenu restartGame={restartGame} />
            <div className="overlay"></div>
          </>
        )}

        <div
          className={
            winner === "red"
              ? "shadow red"
              : winner === "yellow"
              ? "shadow yellow"
              : "shadow"
          }
        ></div>
      </main>
    </div>
  );
};

export default Game;
