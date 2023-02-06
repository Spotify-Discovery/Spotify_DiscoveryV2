import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  feed: [],
  isLoading: false,
}

export const feedSlice = createSlice({
  name: 'feedSlice',
  initialState,
  reducers: {
    addToFeed: (state, data) => {
      state.feed.unshift(data.payload);
    },
    setIsLoading: (state, data) => {
      state.isLoading = data.payload;
    }
  }
});

export const { addToFeed, setIsLoading } = feedSlice.actions;

export default feedSlice.reducer;