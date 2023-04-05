import { createSlice } from "@reduxjs/toolkit";

const initialUserSettings = {
  autoPlayPreviews: true,
}

const initialState = {
  refresh_token: localStorage.getItem('refresh_token') || null,
  username: '',
  email: '',
  market: '',
  user_id: '',
  product: '',
  topArtists: [],
  topTracks: [],
  history: [],
  settings: localStorage.getItem('user_settings') ? JSON.parse(localStorage.getItem('user_settings')) : initialUserSettings
}

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setToken: (state, data) => {
      // Store refresh token in localStorage and in state
      localStorage.setItem('refresh_token', data.payload);
      state.refresh_token = data.payload;
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
    },
    setUserSettings: (state, data) => {
      console.log(data.payload)
      let userSettings = JSON.stringify(data.payload);
      console.log(userSettings)
      localStorage.setItem('user_settings', userSettings);
      state.settings = data.payload;
    },
    setAutoPlayPreviews: (state, data) => {
      state.settings.autoPlayPreviews = data.payload;
      let userSettings = JSON.stringify(state.settings);
      localStorage.setItem('user_settings', userSettings);
      state.settings.autoPlayPreviews = data.payload;
    },
    addToHistory: (state, data) => {
      state.history.push(data.payload);
    }
  }
});

export const { setToken, setUserData, setTopTracks, setTopArtists, setUserSettings, setAutoPlayPreviews, addToHistory } = userSlice.actions;

export default userSlice.reducer;