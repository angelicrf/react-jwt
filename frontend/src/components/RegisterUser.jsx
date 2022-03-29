import { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser, reset } from "../features/allAuth/authSliceUser";
import { FaUser } from "react-icons/fa";
import Spinner from "../contents/Spinner";

function RegisterUser() {
  const [registerState, setRegisterState] = useState({
    name: 'Adam',
    email: 'adam@gmail.com',
    password : '5656',
    passwordConf : '5656'
  });
  const {name, email,password,passwordConf} = registerState ;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { haveLoading, haveSuccess, haveError, user, msg } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (haveError) {
      toast.error(msg);
    }
    if (haveSuccess || user) {
      navigate("/");
    }
    dispatch(reset());
  }, [user, haveError, haveSuccess, msg, navigate, dispatch]);
  const onChange = (e) => {
    setRegisterState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (registerState.password !== registerState.passwordConf) {
      toast.error("Password is incorrect");
    } else {
      const newUserData = {name : registerState.name, email: registerState.email, password : registerState.password };
      console.log("newUserData " + newUserData)
      dispatch(registerUser(newUserData));
    }
  };

  if (haveLoading) {
    return <Spinner />;
  }
  return (
    <Fragment>
      <section className="heading">
        <h1>
          <FaUser /> RegisterUser
        </h1>
      </section>
      <section>
        <div className="input-icon">
          <form className="form" onSubmit={onSubmit}>
            <div className="form-group">
              <input
                type="text"
                id="userName"
                className="form-control"
                value={name}
                name="userName"
                placeholder="Enter User Name"
                onChange={onChange}
              />
              <FaUser className="icon" />
            </div>
            <div className="form-group">
              <input
                type="email"
                id="userEmail"
                className="form-control"
                value={email}
                name="userEmail"
                placeholder="Enter User Email"
                onChange={onChange}
              />
              <FaUser className="icon" />
            </div>
            <div className="form-group">
              <input
                type="password"
                id="userPassword"
                className="form-control"
                value={password}
                name="userPassword"
                placeholder="Enter User Password"
                onChange={onChange}
              />
              <FaUser className="icon" />
            </div>
            <div className="form-group">
              <input
                type="password"
                id="userPasswordConf"
                className="form-control"
                value={passwordConf}
                name="userPasswordConf"
                placeholder="Confirm password"
                onChange={onChange}
              />
              <FaUser className="icon" />
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

export default RegisterUser;
