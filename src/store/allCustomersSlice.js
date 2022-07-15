import { createSlice } from "@reduxjs/toolkit";

export const allCustomersSlice = createSlice({
  name: "allCustomers",
  initialState: {
    value: [],
  },
  reducers: {
    set: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { set } = allCustomersSlice.actions;

export default allCustomersSlice.reducer;
