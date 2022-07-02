import Home from "./pages/home/Home";
import TotalCustomers from "./pages/total-customers/TotalCustomers";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import ChangePassword from "./pages/change-password/ChangePassword";
import AddChannel from "./pages/add-channel/AddChannel";
import CustomersAddNew from "./pages/customers-add-new/CustomersAddNew";
import EmployeesAddNew from "./pages/employees-add-new/EmployeesAddNew";
import CustomersDeleted from "./pages/customers-deleted/CustomersDeleted";
import CustomersNew from "./pages/customers-new/CustomersNew";
import CustomersImport from "./pages/customers-import/CustomersImport";
import CustomersExport from "./pages/customers-export/CustomersExport";
import ProjectsDisplay from "./pages/projects-display/ProjectsDisplay";
import ProjectsAddNew from "./pages/projects-add-new/ProjectsAddNew";
import Reports from "./pages/reports/Reports";
import EmployeesData from "./pages/employees-data/EmployeesData";

function App() {
  return (
    <div className="App">
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/customers/total" element={<TotalCustomers />} />
            <Route path="/customers/deleted" element={<CustomersDeleted />} />
            <Route path="/customers/new" element={<CustomersNew />} />
            <Route path="/customers/import" element={<CustomersImport />} />
            <Route path="/customers/export" element={<CustomersExport />} />
            <Route path="/projects/display" element={<ProjectsDisplay />} />
            <Route path="/projects/new" element={<ProjectsAddNew />} />
            <Route path="/reports" element={<Reports />} />
            <Route
              path="/settings/change-password"
              element={<ChangePassword />}
            />
            <Route path="/add-channel" element={<AddChannel />} />
            <Route path="/customers/add-new" element={<CustomersAddNew />} />
            <Route path="/employees/new" element={<EmployeesAddNew />} />
            <Route path="/employees/data" element={<EmployeesData />} />
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
