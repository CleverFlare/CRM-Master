import { configureStore } from "@reduxjs/toolkit";
import tokenSlice from "./store/tokenSlice";

export default configureStore({
  reducer: {
    token: tokenSlice,
  },
});
