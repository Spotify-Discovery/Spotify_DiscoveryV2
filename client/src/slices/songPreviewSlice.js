import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  song: null
}

export const songPreviewSlice = createSlice({
  name: 'songPreviewSlice',
  initialState,
  reducers: {
    setSong: (state, data) => {
      state.song = data.payload;
    }
  }
});

export const { setSong } = songPreviewSlice.actions;

export default songPreviewSlice.reducer;