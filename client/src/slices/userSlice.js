import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  access_token: null,
  refresh_token: null,
  username: '',
  email: '',
  market: '',
  user_id: '',
  product: '',
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
      state.username = data.payload.username;
      state.market = data.payload.market;
      state.product = data.payload.product;
      state.email = data.payload.email;
      state.user_id = data.payload.user_id;
    },
    setTopTracks: (state, data) => {
      state.topTracks = data.payload.topTracks;
    },
    setTopArtists: (state, data) => {
      state.topArtists = data.payload.topArtists;
    }
  }
});

export const { setToken, setUserData, setTopTracks, setTopArtists } = userSlice.actions;

export default userSlice.reducer;