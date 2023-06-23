import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isClicked: false,
  coords: {
    x: 0,
    y: 0
  },
  item: {},
  type: ''
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
    },
    setContextMenuItem: (state, data) => {
      state.item = data.payload.item;
      state.type = data.payload.type;
    }
  }
});

export const { setContextMenuClicked, setContextMenuPosition, setContextMenuItem } = contextMenuSlice.actions;

export default contextMenuSlice.reducer;