import Home from "./pages/home/Home";
import TotalCustomers from "./pages/customers/total/TotalCustomers";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ChangePassword from "./pages/change-password/ChangePassword";
import AddChannel from "./pages/channels/add-channel/AddChannel";
import CustomersAddNew from "./pages/customers/add-new/CustomersAddNew";
import EmployeesAddNew from "./pages/employees/add-new/EmployeesAddNew";
import CustomersDeleted from "./pages/customers/deleted/CustomersDeleted";
import CustomersNew from "./pages/customers/new/CustomersNew";
import CustomersImport from "./pages/customers/import/CustomersImport";
import CustomersExport from "./pages/customers/export/CustomersExport";
import ProjectsDisplay from "./pages/projects/display/ProjectsDisplay";
import ProjectsAddNew from "./pages/projects/add-new/ProjectsAddNew";
import Reports from "./pages/reports/Reports";
import EmployeesData from "./pages/employees/data/EmployeesData";
import CustomersStatistics from "./pages/customers/statistics/CustomersStatistics";
import Login from "./pages/login/Login";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import AddJob from "./pages/employees/add-job/AddJob";
import Jobs from "./pages/employees/jobs/Jobs";
import AddStatus from "./pages/customers/add-status/AddStatus";
import Statuses from "./pages/customers/statuses/Statuses";
import DisplayChannels from "./pages/channels/display/DisplayChannels";
import useGet from "./hooks/useGet";

function App() {
  const permissions = useSelector((state) => state.permissions.value);
  const token = useSelector((state) => state.token.value);
  return (
    <div className="App">
      <Router>
        {token && (
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/customers/statistics"
                element={<CustomersStatistics />}
              />
              {permissions.includes("view_aqarclient") && (
                <Route path="/customers/total" element={<TotalCustomers />} />
              )}
              {permissions.includes("view_aqarclient") && (
                <Route
                  path="/customers/deleted"
                  element={<CustomersDeleted />}
                />
              )}
              {permissions.includes("view_aqarclient") && (
                <Route path="/customers/new" element={<CustomersNew />} />
              )}
              <Route path="/customers/import" element={<CustomersImport />} />
              <Route path="/customers/export" element={<CustomersExport />} />
              {permissions.includes("view_aqarproject") && (
                <Route path="/projects/display" element={<ProjectsDisplay />} />
              )}
              {permissions.includes("add_aqarclient") && (
                <Route
                  path="/customers/add-new"
                  element={<CustomersAddNew />}
                />
              )}
              {permissions.includes("add_aqarevent") && (
                <Route path="/customers/add-status" element={<AddStatus />} />
              )}
              {permissions.includes("view_aqarevent") && (
                <Route path="/customers/statuses" element={<Statuses />} />
              )}
              {permissions.includes("add_aqarproject") && (
                <Route path="/projects/new" element={<ProjectsAddNew />} />
              )}
              <Route path="/reports" element={<Reports />} />
              <Route
                path="/settings/change-password"
                element={<ChangePassword />}
              />
              {permissions.includes("add_aqarchannel") && (
                <Route path="/channels/add-new" element={<AddChannel />} />
              )}
              {permissions.includes("view_aqarchannel") && (
                <Route path="/channels/display" element={<DisplayChannels />} />
              )}
              {permissions.includes("add_aqaremployee") && (
                <Route path="/employees/new" element={<EmployeesAddNew />} />
              )}
              {permissions.includes("view_aqaremployee") && (
                <Route path="/employees/data" element={<EmployeesData />} />
              )}
              {permissions.includes("add_aqarjob") && (
                <Route path="/employees/add-job" element={<AddJob />} />
              )}
              {permissions.includes("view_aqarjob") && (
                <Route path="/employees/jobs" element={<Jobs />} />
              )}
            </Routes>
          </Layout>
        )}
        {!token && (
          <Routes>
            <Route path="/*" element={<Login />} />
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;
