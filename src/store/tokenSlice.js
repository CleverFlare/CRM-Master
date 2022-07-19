import { createSlice } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
  name: "token",
  initialState: {
    value: localStorage.getItem("token") ? localStorage.getItem("token") : null,
  },
  reducers: {
    set: (state, action) => {
      state.value = action.payload;
      localStorage.setItem("token", action.payload);
    },
    remove: (state) => {
      state.value = null;
      localStorage.removeItem("token");
    },
  },
});

export const { set, remove } = tokenSlice.actions;

export default tokenSlice.reducer;
