import {useState, useEffect } from "react";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {logoutUser} from "../features/allAuth/authSliceUser";

function NavBar() {
  const dispatch = useDispatch();
  const [isUserLogged,setisUserLogged] = useState(false)
  const thisLogOut = () => {
    console.log("thisLogOut")
    dispatch(logoutUser())
    //needs to be changed in useEffect
    setisUserLogged(false)
  };
  const { haveSuccess } = useSelector((state) => state.auth);
  useEffect(() => {
    if (haveSuccess) {
      if (!localStorage.getItem("user")) {
        console.log("userExits")
        setisUserLogged(true)
      }
    }
  }, [isUserLogged, haveSuccess, dispatch]);
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">All Goals</Link>
      </div>
      <ul>
        <li>
          {isUserLogged ? (
            <button onClick={() => thisLogOut()} className="btn">
              <FaSignOutAlt /> LogOutUser
            </button>
          ) : (
            <Link to="/login">
              <FaSignInAlt /> LoginUser
            </Link>
          )}
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
