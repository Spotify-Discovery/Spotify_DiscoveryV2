import { createSlice } from "@reduxjs/toolkit";

const mediaPlayer = new Audio();

mediaPlayer.volume = 0.5;

const initialState = {
  song: {}
}

export const songPreviewSlice = createSlice({
  name: 'songPreviewSlice',
  initialState,
  reducers: {
    setSong: (state, data) => {
      // console.log(data.payload)
      if (data.payload.type === 'FROM_ALBUM') {
        var songObj = {
          ...data.payload.track,
          album: data.payload.album
        }
        state.song = songObj;
      } else {
        state.song = data.payload;
      }
    },

    playSong: (state, data) => {
      if (!mediaPlayer.paused) {
        mediaPlayer.pause();
      }
      if (state.song.preview_url) {
        mediaPlayer.src = state.song.preview_url;
        mediaPlayer.play();
      }
    },

    pauseSong: (state, data) => {
      console.log('pausing');
      mediaPlayer.pause();
      console.log('song is null');
      mediaPlayer.src = '';
    }
  }
});

export const { setSong, playSong, pauseSong } = songPreviewSlice.actions;

export default songPreviewSlice.reducer;