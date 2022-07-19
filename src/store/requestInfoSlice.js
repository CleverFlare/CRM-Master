import { createSlice } from "@reduxjs/toolkit";

export const requestInfoSlice = createSlice({
  name: "requestInfo",
  initialState: {
    value: {
      token: "dcc24a8422b772ad650a2db37d66930b1efab13a",
      userId: "1",
      organization: "1",
      protocol: "https",
      subDomain: "crmsystem",
      domain: "cyparta",
      topLevelDomain: "com",
    },
  },
  reducers: {
    set: (state, action) => {
      state.value = action.payload;
      localStorage.setItem("token", action.payload);
    },
    remove: (state) => {
      state.value = null;
      localStorage.removeItem("token");
    },
  },
});

export const { set, remove } = requestInfoSlice.actions;

export default requestInfoSlice.reducer;
