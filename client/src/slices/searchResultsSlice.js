import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tracks: [],
  artists: [],
}

export const searchResultsSlice = createSlice({
  name: 'songPreviewSlice',
  initialState,
  reducers: {
    setTracks: (state, data) => {
      state.tracks = data.payload;
    },
    setArtists: (state, data) => {
      state.artists = data.payload;
    }
  }
});

export const { setTracks, setArtists } = searchResultsSlice.actions;

export default searchResultsSlice.reducer;