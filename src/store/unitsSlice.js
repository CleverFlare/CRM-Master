import { createSlice } from "@reduxjs/toolkit";

export const unitsSlice = createSlice({
  name: "units",
  initialState: {
    value: [],
  },
  reducers: {
    set: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { set } = unitsSlice.actions;

export default unitsSlice.reducer;
