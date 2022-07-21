import { createSlice } from "@reduxjs/toolkit";

export const permissionsSlice = createSlice({
  name: "permissions",
  initialState: {
    value: [],
  },
  reducers: {
    set: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { set } = permissionsSlice.actions;

export default permissionsSlice.reducer;
