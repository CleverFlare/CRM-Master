import { createSlice } from "@reduxjs/toolkit";

export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState: {
    value: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : {
          name: "غير معروف",
          job: "مندوب مبيعات",
          picture: "",
        },
  },
  reducers: {
    set: (state, action) => {
      state.value = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
  },
});

export const { set } = userInfoSlice.actions;

export default userInfoSlice.reducer;
