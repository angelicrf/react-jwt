import { Fragment, useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";

function LoginUser() {
  const [registerState, setRegisterState] = useState({
    email: "",
    password: "",
  });
  const { name, email, password, passwordConf } = registerState;
  const onChange = (e) => {
    setRegisterState(() => ({
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = (e) => e.preventDefault();
  return (
    <Fragment>
      <section className="heading">
        <h1>
          <FaSignInAlt /> LoginUser
        </h1>
      </section>
      <section className="form">
        <div className='input-icon'>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              id="userEmail"
              className="form-control"
              value={email}
              name="userEmail"
              placeholder="Enter User Email"
              onChange={onChange}
            /><FaSignInAlt  className='icon'/>
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
            /><FaSignInAlt  className='icon'/>
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
