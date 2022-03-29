import { Fragment, useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
function RegisterUser() {
  const [registerState, setRegisterState] = useState({
    name: "",
    email: "",
    password: "",
    passwordConf: "",
  });
  const { name, email, password, passwordConf } = registerState;
  const onChange = () => console.log("onChanged");
  return (
    <Fragment>
      <section className="heading">
        <h1>
          <FaUser /> RegisterUser
        </h1>
      </section>
      <section>
        <form className="form">
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
          </div>
          <div className="form-control">
            <input type="submit" className="btn btn-block" />
          </div>
        </form>
      </section>
    </Fragment>
  );
}

export default RegisterUser;
