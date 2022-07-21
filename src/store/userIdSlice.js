import { createSlice } from "@reduxjs/toolkit";

export const userIdSlice = createSlice({
  name: "id",
  initialState: {
    value: localStorage.getItem("userId")
      ? localStorage.getItem("userId")
      : "1",
  },
  reducers: {
    set: (state, action) => {
      state.value = action.payload;
      localStorage.setItem("userId", action.payload);
    },
    remove: (state) => {
      state.value = "";
      localStorage.setItem("userId", "");
    },
  },
});

export const { set } = userIdSlice.actions;

export default userIdSlice.reducer;
