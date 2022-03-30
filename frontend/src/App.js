import { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainApp from "./components/MainApp";
import LoginUser from "./components/LoginUser";
import RegisterUser from "./components/RegisterUser";
import NavBar from "./contents/NavBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      <ToastContainer />
    </Fragment>
  );
}

export default App;
