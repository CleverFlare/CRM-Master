import { createSlice } from "@reduxjs/toolkit";

export const deletedCustomers = createSlice({
  name: "deletedCustomers",
  initialState: {
    value: [],
  },
  reducers: {
    set: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { set } = deletedCustomers.actions;

export default deletedCustomers.reducer;
