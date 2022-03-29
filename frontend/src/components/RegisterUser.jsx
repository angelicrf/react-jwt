import { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser, reset } from "../features/allAuth/authSliceUser";
import { FaUser } from "react-icons/fa";
import Spinner from "../contents/Spinner";

function RegisterUser() {
  const [registerState, setRegisterState] = useState({
    name: "",
    email: "",
    password: "",
    passwordConf: "",
  });
  const { name, email, password, passwordConf } = registerState;
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
  const handleChange = (e) => {
    e.persist();
    setRegisterState((prevState) => ({
      ...prevState,
      name: e.target.value,
    }));
  };
  const handleChangeEmail = (e) => {
    e.persist();
    setRegisterState((prevState) => ({
      ...prevState,
      email: e.target.value,
    }));
  };
  const handleChangePassword = (e) => {
    e.persist();
    setRegisterState((prevState) => ({
      ...prevState,
      password: e.target.value,
    }));
  };
  const handleChangePassordConf = (e) => {
    e.persist();
    setRegisterState((prevState) => ({
      ...prevState,
      passwordConf: e.target.value,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== passwordConf) {
      toast.error("Password is incorrect");
    } else {
      const newUserData = {
        name: registerState.name,
        email: registerState.email,
        password: registerState.password,
      };
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
                defaultValue={name}
                name="userName"
                placeholder="Enter User Name"
                onChange={handleChange}
              />
              <FaUser className="icon" />
            </div>
            <div className="form-group">
              <input
                type="email"
                id="userEmail"
                className="form-control"
                defaultValue={email}
                name="userEmail"
                placeholder="Enter User Email"
                onChange={handleChangeEmail}
              />
              <FaUser className="icon" />
            </div>
            <div className="form-group">
              <input
                type="password"
                id="userPassword"
                className="form-control"
                defaultValue={password}
                name="userPassword"
                placeholder="Enter User Password"
                onChange={handleChangePassword}
              />
              <FaUser className="icon" />
            </div>
            <div className="form-group">
              <input
                type="password"
                id="userPasswordConf"
                className="form-control"
                defaultValue={passwordConf}
                name="userPasswordConf"
                placeholder="Confirm password"
                onChange={handleChangePassordConf}
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
