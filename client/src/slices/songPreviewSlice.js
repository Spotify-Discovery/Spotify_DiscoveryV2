import { createSlice } from "@reduxjs/toolkit";

const mediaPlayer = new Audio();

mediaPlayer.volume = 0.5;

const initialState = {
  songUrl: null
}

export const songPreviewSlice = createSlice({
  name: 'songPreviewSlice',
  initialState,
  reducers: {
    setSong: (state, data) => {
      // console.log(data.payload)
      state.songUrl = data.payload;
    },

    playSong: (state, data) => {
      console.log('song is not null')
      if (!mediaPlayer.paused) {
        mediaPlayer.pause();
      }
      if (state.songUrl) {
        mediaPlayer.src = state.songUrl;
        mediaPlayer.play();
      }
    },

    pauseSong: (state, data) => {
      console.log('song is null');
      mediaPlayer.pause();
      console.log('pausing');
      mediaPlayer.src = '';
    }
  }
});

export const { setSong, playSong, pauseSong } = songPreviewSlice.actions;

export default songPreviewSlice.reducer;