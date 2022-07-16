import { configureStore } from "@reduxjs/toolkit";
import allCustomersSlice from "./store/allCustomersSlice";
import channelsSlice from "./store/channelsSlice";
import deletedCustomers from "./store/deletedCustomers";
import domainSlice from "./store/domainSlice";
import employeesSlice from "./store/employeesSlice";
import jobsSlice from "./store/jobsSlice";
import postsSlice from "./store/postsSlice";
import projectsSlice from "./store/projectsSlice";
import tokenSlice from "./store/tokenSlice";
import userIdSlice from "./store/userIdSlice";

export default configureStore({
  reducer: {
    token: tokenSlice,
    projects: projectsSlice,
    channels: channelsSlice,
    employees: employeesSlice,
    posts: postsSlice,
    allCustomers: allCustomersSlice,
    id: userIdSlice,
    domain: domainSlice,
    jobs: jobsSlice,
    deletedCustomers: deletedCustomers,
  },
});
