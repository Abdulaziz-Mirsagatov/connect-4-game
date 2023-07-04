import { configureStore } from "@reduxjs/toolkit";
import pagesReducer from "../features/pagesSlice";
import ingameMenuReducer from "../features/ingameMenuSlice";
import boardReducer from "../features/boardSlice";
import playersReducer from "./../features/playersSlice";

export const store = configureStore({
  reducer: {
    pages: pagesReducer,
    ingameMenu: ingameMenuReducer,
    board: boardReducer,
    players: playersReducer,
  },
});
