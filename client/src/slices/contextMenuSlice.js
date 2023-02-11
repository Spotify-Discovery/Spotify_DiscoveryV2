import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isClicked: false,
  coords: {
    x: 0,
    y: 0
  }
}

export const contextMenuSlice = createSlice({
  name: 'contextMenuSlice',
  initialState,
  reducers: {
    setContextMenuClicked: (state, data) => {
      state.isClicked = data.payload;
    },
    setContextMenuPosition: (state, data) => {
      state.coords = data.payload;
    }
  }
});

export const { setContextMenuClicked, setContextMenuPosition } = contextMenuSlice.actions;

export default contextMenuSlice.reducer;