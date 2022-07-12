import { configureStore } from "@reduxjs/toolkit";
import postsSlice from "./store/postsSlice";

export default configureStore({
  reducer: {
    posts: postsSlice,
  },
});
