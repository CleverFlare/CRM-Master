import { createSlice } from "@reduxjs/toolkit";

export const countriesCodeSlice = createSlice({
  name: "dial",
  initialState: {
    value: [],
  },
  reducers: {
    set: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { set } = countriesCodeSlice.actions;

export default countriesCodeSlice.reducer;
