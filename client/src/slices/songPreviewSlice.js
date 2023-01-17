import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  song: {}
}

export const songPreviewSlice = createSlice({
  name: 'songPreviewSlice',
  initialState,
  reducers: {
    setSong: (state, data) => {
      state.song = data.payload.song;
    }
  }
});

export default playbackSlice.reducer;