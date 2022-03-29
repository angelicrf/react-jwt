import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
function NavBar() {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">All Goals</Link>
      </div>
      <ul>
        <li>
          <Link to="/login">
            <FaSignInAlt /> LoginUser
          </Link>
        </li>
        <li>
          <Link to="/register">
            <FaUser /> RegisterUser
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default NavBar;
