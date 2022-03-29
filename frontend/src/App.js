import { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainApp from "./components/MainApp";
import LoginUser from "./components/LoginUser";
import RegisterUser from "./components/RegisterUser";
import NavBar from "./contents/NavBar";
function App() {
  return (
    <Fragment>
      <Router>
        <NavBar />
        <div className="container">
          <Routes>
            <Route path="/" element={<MainApp />} />
            <Route path="/login" element={<LoginUser />} />
            <Route path="/register" element={<RegisterUser />} />
          </Routes>
          <div>
            <h1>App Component React JWT</h1>
          </div>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
