import { configureStore } from "@reduxjs/toolkit";
import allCustomersSlice from "./store/allCustomersSlice";
import channelsSlice from "./store/channelsSlice";
import deletedCustomers from "./store/deletedCustomers";
import domainSlice from "./store/domainSlice";
import employeesSlice from "./store/employeesSlice";
import jobsSlice from "./store/jobsSlice";
import postsSlice from "./store/postsSlice";
import projectsSlice from "./store/projectsSlice";
import requestInfoSlice from "./store/requestInfoSlice";
import statusSlice from "./store/statusSlice";
import tokenSlice from "./store/tokenSlice";
import userIdSlice from "./store/userIdSlice";
import userInfoSlice from "./store/userInfoSlice";
import permissionsSlice from "./store/permissionsSlice";
import newClientsSlice from "./store/newClientsSlice";
import countriesCodeSlice from "./store/countriesCodeSlice";
import parametersSlice from "./store/parametersSlice";
import unitsSlice from "./store/unitsSlice";

export default configureStore({
  reducer: {
    userInfo: userInfoSlice,
    requestInfo: requestInfoSlice,
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
    status: statusSlice,
    permissions: permissionsSlice,
    newClients: newClientsSlice,
    dial: countriesCodeSlice,
    parameters: parametersSlice,
    units: unitsSlice,
  },
});
