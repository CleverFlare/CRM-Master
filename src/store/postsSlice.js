import { createSlice } from "@reduxjs/toolkit";

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    value: [],
  },
  reducers: {
    add: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { add } = postsSlice.actions;

export default postsSlice.reducer;
