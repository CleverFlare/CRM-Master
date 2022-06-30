import Home from "./pages/home/Home";
import TotalCustomers from "./pages/total-customers/TotalCustomers";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import ChangePassword from "./pages/change-password/ChangePassword";

console.log("new device");

function App() {
  return (
    <div className="App">
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/customers/total" element={<TotalCustomers />} />
            <Route
              path="/settings/change-password"
              element={<ChangePassword />}
            />
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
