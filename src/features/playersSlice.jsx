import { createSlice } from "@reduxjs/toolkit";

const newPlayer = {
  score: 0,
  time: 30,
};

const initialState = {
  player1: newPlayer,
  player2: newPlayer,
};

export const playersSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    increasePlayerScore1: (state) => {
      state.player1.score += 1;
    },
    increasePlayerScore2: (state) => {
      state.player2.score += 1;
    },
    decreaseTimePlayer1: (state) => {
      if (state.player1.time > 0) state.player1.time -= 1;
    },
    decreaseTimePlayer2: (state) => {
      if (state.player2.time > 0) state.player2.time -= 1;
    },
    reinitializePlayers: (state) => {
      state.player1 = state.player2 = newPlayer;
    },
    restartTime: (state) => {
      state.player1.time = state.player2.time = newPlayer.time;
    },
  },
});

export const selectPlayer1 = (state) => state.players.player1;
export const selectPlayer2 = (state) => state.players.player2;

export const {
  increasePlayerScore1,
  increasePlayerScore2,
  decreaseTimePlayer1,
  decreaseTimePlayer2,
  restartTime,
  reinitializePlayers,
} = playersSlice.actions;

export default playersSlice.reducer;
