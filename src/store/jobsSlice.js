import { createSlice } from "@reduxjs/toolkit";

export const jobsSlice = createSlice({
  name: "jobs",
  initialState: {
    value: [],
  },
  reducers: {
    set: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { set } = jobsSlice.actions;

export default jobsSlice.reducer;
