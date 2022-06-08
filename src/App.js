import SideBar from "./uikit/complex/SideBar";
import TopBar from "./uikit/complex/TopBar";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <SideBar
          name="احمد محمد"
          role="فريق المبيعات"
          picture="https://i.pinimg.com/736x/25/1b/c1/251bc1f03f23cc865d6a21e83efc02f8.jpg"
        />
        <TopBar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
