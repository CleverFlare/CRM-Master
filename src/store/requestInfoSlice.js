import { createSlice } from "@reduxjs/toolkit";

export const requestInfoSlice = createSlice({
  name: "requestInfo",
  initialState: {
    value: {
      userId: "1",
      organization: "1",
      protocol: "https",
      subDomain: "crmsystem",
      domain: "cyparta",
      topLevelDomain: "com",
    },
  },
  reducers: {},
});

// export const { set, remove } = requestInfoSlice.actions;

export default requestInfoSlice.reducer;
