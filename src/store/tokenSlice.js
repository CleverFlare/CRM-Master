import { createSlice } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
  name: "token",
  initialState: {
    value: localStorage.getItem("token") ? localStorage.getItem("token") : null,
<<<<<<< HEAD
=======
    // value: "c4909c2cafc2fd526d1febc544b66a0d56bc1f72",
>>>>>>> 7621428bf5ab35b74a6ff194d9a7a70f351e5284
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
