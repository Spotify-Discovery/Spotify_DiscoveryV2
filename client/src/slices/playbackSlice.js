import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPlaying: false,
}

export const playbackSlice = createSlice({
  name: 'playbackSlice',
  initialState,
  reducers: {
    setIsPlaying: (state, data) => {
      state.isPlaying = data.payload;
    }
  }
});

export const { setIsPlaying } = playbackSlice.actions;

export default playbackSlice.reducer;