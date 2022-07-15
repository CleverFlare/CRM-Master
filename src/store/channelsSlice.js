import { createSlice } from "@reduxjs/toolkit";

export const channelsSlice = createSlice({
  name: "channels",
  initialState: {
    value: [],
  },
  reducers: {
    set: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { set } = channelsSlice.actions;

export default channelsSlice.reducer;
