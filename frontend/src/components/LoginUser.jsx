import { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  loginUser,
  logoutUser,
  reset,
} from "../features/allAuth/authSliceUser";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import Spinner from "../contents/Spinner";

function LoginUser() {
  const [registerState, setRegisterState] = useState({
    email: "",
    password: "",
  });
  const { email, password } = registerState;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let isLoggedIn = false;
  const { haveLoading, haveSuccess, haveError, user, msg } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (haveError) {
      toast.error(msg);
    }
    if (haveSuccess || user) {
      isLoggedIn = true;
      navigate("/");    
    }
    dispatch(reset());
  }, [user, haveError, haveSuccess, msg, navigate, dispatch]);

  const onChangeEmail = (e) => {
    setRegisterState((prev) => ({
      ...prev,
      email: e.target.value,
    }));
  };
  const onChangePassword = (e) => {
    setRegisterState((prev) => ({
      ...prev,
      password: e.target.value,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(email)
    console.log(password)
    if (!password) {
      toast.error("Password must entered");
    } else {
      const newUserLgData = {
        email: registerState.email,
        password: registerState.password,
      };
      dispatch(loginUser(newUserLgData));
    }
  };
  if (haveLoading) {
    return <Spinner />;
  }
  return (
    <Fragment>
      <section className="heading">
        {isLoggedIn ? (
          <h1>
            <FaSignOutAlt /> LogOutUser
          </h1>
        ) : (
          <h1>
            <FaSignInAlt /> LoginUser
          </h1>
        )}
      </section>
      <section className="form">
        <div className="input-icon">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input
                type="email"
                id="userEmail"
                className="form-control"
                defaultValue={email}
                name="userEmail"
                placeholder="Enter User Email"
                onChange={onChangeEmail}
              />
              <FaSignInAlt className="icon" />
            </div>
            <div className="form-group">
              <input
                type="password"
                id="userPassword"
                className="form-control"
                defaultValue={password}
                name="userPassword"
                placeholder="Enter User Password"
                onChange={onChangePassword}
              />
              <FaSignInAlt className="icon" />
            </div>

            <div className="form-control">
              <input type="submit" className="btn btn-block" />
            </div>
          </form>
        </div>
      </section>
    </Fragment>
  );
}

export default LoginUser;
