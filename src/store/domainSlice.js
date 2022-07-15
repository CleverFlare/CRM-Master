import { createSlice } from "@reduxjs/toolkit";

export const domainSlice = createSlice({
  name: "domain",
  initialState: {
    value: "https://crmsystem.cyparta.com/",
  },
  reducers: {
    set: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { set } = domainSlice.actions;

export default domainSlice.reducer;
