import { createSlice } from "@reduxjs/toolkit";

export const newClientsSlice = createSlice({
  name: "newClients",
  initialState: {
    value: [],
  },
  reducers: {
    set: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { set } = newClientsSlice.actions;

export default newClientsSlice.reducer;
