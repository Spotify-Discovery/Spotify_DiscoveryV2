import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentView: 'Login'
}

export const viewSlice = createSlice({
  name: 'viewSlice',
  initialState,
  reducers: {
    setView: (state, data) => {
      state.currentView = data.payload;
    }
  }
});

export const { setView } = viewSlice.actions;

export default viewSlice.reducer;