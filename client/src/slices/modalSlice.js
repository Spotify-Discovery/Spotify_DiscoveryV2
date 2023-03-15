import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
}

export const modalSlice = createSlice({
  name: 'modalSlice',
  initialState,
  reducers: {
    setIsOpen: (state, data) => {
      state.isOpen = data.payload;
    },
  }
});

export const { setIsOpen } = modalSlice.actions;

export default modalSlice.reducer;