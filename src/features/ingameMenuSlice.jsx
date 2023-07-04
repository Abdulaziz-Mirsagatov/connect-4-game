import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const ingameMenuSlice = createSlice({
  name: "ingameMenu",
  initialState,
  reducers: {
    openMenu: (state) => {
      state.value = true;
    },
    closeMenu: (state) => {
      state.value = false;
    },
  },
});

export const selectIngameMenu = (state) => state.ingameMenu.value;

export const { openMenu, closeMenu } = ingameMenuSlice.actions;

export default ingameMenuSlice.reducer;
