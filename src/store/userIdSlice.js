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
  },
});

export const { set } = userIdSlice.actions;

export default userIdSlice.reducer;
