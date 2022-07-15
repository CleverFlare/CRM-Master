import Home from "./pages/home/Home";
import TotalCustomers from "./pages/customers/total/TotalCustomers";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ChangePassword from "./pages/change-password/ChangePassword";
import AddChannel from "./pages/add-channel/AddChannel";
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

function App() {
  const token = useSelector((state) => state.token.value);
  const dispatch = useDispatch();
  useEffect(() => {
    fetch("http://161.35.60.195:8080/aqar/api/router/Project/", {
      method: "GET",
      headers: {
        //prettier-ignore
        "Authorization": "Token " + token,
      },
    })
      .then((res) => {
        if (!res.ok) throw Error("couldn't fetch the data of that resource");
        return res.json();
      })
      .then((json) => {
        dispatch({ type: "projects/set", payload: json });
      });
    fetch("http://161.35.60.195:8080/aqar/api/router/Channel/", {
      method: "GET",
      headers: {
        //prettier-ignore
        "Authorization": "Token " + token,
      },
    })
      .then((res) => {
        if (!res.ok) throw Error("couldn't fetch the data of that resource");
        return res.json();
      })
      .then((json) => {
        dispatch({ type: "channels/set", payload: json });
      });
    fetch("http://161.35.60.195:8080/aqar/api/router/Employee/", {
      method: "GET",
      headers: {
        //prettier-ignore
        "Authorization": "Token " + token,
      },
    })
      .then((res) => {
        if (!res.ok) throw Error("couldn't fetch the data of that resource");
        return res.json();
      })
      .then((json) => {
        dispatch({ type: "employees/set", payload: json });
      });
  }, []);
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
              <Route path="/customers/total" element={<TotalCustomers />} />
              <Route path="/customers/deleted" element={<CustomersDeleted />} />
              <Route path="/customers/new" element={<CustomersNew />} />
              <Route path="/customers/import" element={<CustomersImport />} />
              <Route path="/customers/export" element={<CustomersExport />} />
              <Route path="/projects/display" element={<ProjectsDisplay />} />
              <Route path="/customers/add-new" element={<CustomersAddNew />} />
              <Route path="/projects/new" element={<ProjectsAddNew />} />
              <Route path="/reports" element={<Reports />} />
              <Route
                path="/settings/change-password"
                element={<ChangePassword />}
              />
              <Route path="/add-channel" element={<AddChannel />} />
              <Route path="/employees/new" element={<EmployeesAddNew />} />
              <Route path="/employees/data" element={<EmployeesData />} />
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
