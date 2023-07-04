import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  menu: true,
  game: false,
  rules: false,
};

export const pagesSlice = createSlice({
  name: "pages",
  initialState,
  reducers: {
    goToMenu: (state) => {
      state.menu = true;
      state.game = false;
      state.rules = false;
    },
    goToGame: (state) => {
      state.menu = false;
      state.game = true;
      state.rules = false;
    },
    goToRules: (state) => {
      state.menu = false;
      state.game = false;
      state.rules = true;
    },
  },
});

export const selectPages = (state) => state.pages;

export const { goToMenu, goToGame, goToRules } = pagesSlice.actions;

export default pagesSlice.reducer;
