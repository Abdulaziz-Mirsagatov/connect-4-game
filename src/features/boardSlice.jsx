import { createSlice } from "@reduxjs/toolkit";

let emptyBoard = [];
for (let i = 0; i < 7; i++) emptyBoard.push(Array(6).fill(null));

// function to check if there is a winner after a disk is dropped
const checkWinner = (row, column, disk, board) => {
  // Check if there is a 4-in-a-row along the column
  if (
    row <= 2 &&
    board[column][row] === disk &&
    board[column][row + 1] === disk &&
    board[column][row + 2] === disk &&
    board[column][row + 3] === disk
  )
    return true;

  // Check if there is a 4-in-a-row along the row
  for (let c = 0; c < 7 - 3; c++)
    if (
      board[c][row] === disk &&
      board[c + 1][row] === disk &&
      board[c + 2][row] === disk &&
      board[c + 3][row] === disk
    )
      return true;

  // Check if there is a 4-in-a-row along the diagonal
  for (let c = 0; c < 7 - 3; c++) {
    for (let r = 0; r < 6 - 3; r++)
      if (
        board[c][r] === disk &&
        board[c + 1][r + 1] === disk &&
        board[c + 2][r + 2] === disk &&
        board[c + 3][r + 3] === disk
      )
        return true;
    for (let r = 5; r >= 3; r--)
      if (
        board[c][r] === disk &&
        board[c + 1][r - 1] === disk &&
        board[c + 2][r - 2] === disk &&
        board[c + 3][r - 3] === disk
      )
        return true;
  }

  // If there is no winning combination
  return false;
};

const initialState = {
  board: emptyBoard,
  turn: "red",
  winner: "",
  starts: "red",
};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    addDisk: (state, action) => {
      const column = action.payload;
      const prevTurn = state.turn;

      // Find index of row to insert new disk
      let indexRed = state.board[column].indexOf("red") - 1;
      let indexYellow = state.board[column].indexOf("yellow") - 1;
      if (indexRed === -2) indexRed = 10;
      if (indexYellow === -2) indexYellow = 10;
      const row =
        indexRed === indexYellow
          ? 5
          : indexRed < indexYellow
          ? indexRed
          : indexYellow;

      // Insert the right disk and change turns
      if (state.turn === "red" && row >= 0) {
        state.board[column][row] = "red";
        state.turn = "yellow";
      } else if (state.turn === "yellow" && row >= 0) {
        state.board[column][row] = "yellow";
        state.turn = "red";
      }

      // Check if there is a winning combination after the last move
      if (row >= 0) {
        const result = checkWinner(row, column, prevTurn, state.board);
        if (result) state.winner = prevTurn;
      }
    },
    cleanBoard: (state) => {
      state.board = emptyBoard;
      state.turn = "red";
    },
    removeWinner: (state) => {
      state.winner = "";
      state.turn = state.starts;
    },
    setWinner: (state, action) => {
      state.winner = action.payload;
    },
    changeStartingPlayer: (state) => {
      state.starts = state.starts === "red" ? "yellow" : "red";
    },
  },
});

export const selectBoard = (state) => state.board.board;
export const selectTurn = (state) => state.board.turn;
export const selectWinner = (state) => state.board.winner;

export const {
  addDisk,
  cleanBoard,
  removeWinner,
  setWinner,
  changeStartingPlayer,
} = boardSlice.actions;

export default boardSlice.reducer;
