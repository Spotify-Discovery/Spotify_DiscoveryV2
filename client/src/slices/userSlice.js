import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  access_token: null,
  refresh_token: null,
  username: '',
  topArtists: [],
  topTracks: [],
}

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setToken: (state, data) => {
      state.access_token = data.payload.access_token;
      state.refresh_token = data.payload.refresh_token;
    },
    setUserData: (state, data) => {
      state.username = username;
      state.topArtists = topArtists;
      state.topTracks = topTracks;
    },
    setTopTracks: (state, data) => {
      state.topTracks = data.payload.topTracks;
    },
    setTopArtists: (state, topArtists) => {
      state.topArtists = topArtists;
    }
  }
});

export const { setToken, setUserData, setTopTracks, setTopArtists } = userSlice.actions;

export default userSlice.reducer;