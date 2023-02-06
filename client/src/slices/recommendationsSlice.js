import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  feed: [],
  isLoading: false,
}

export const recommendationsSlice = createSlice({
  name: 'recommendationsSlice',
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

export const { addToFeed, setIsLoading } = recommendationsSlice.actions;

export default recommendationsSlice.reducer;