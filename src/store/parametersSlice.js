import { createSlice } from "@reduxjs/toolkit";

export const parametersSlice = createSlice({
  name: "parameters",
  initialState: {
    value: "",
  },
  reducers: {
    set: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { set } = parametersSlice.actions;

export default parametersSlice.reducer;
