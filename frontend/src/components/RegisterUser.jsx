import { Fragment, useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
function RegisterUser() {
  const [registerState, setRegisterState] = useState({
    name: "angy",
    email: "",
    password: "",
    passwordConf: "",
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
          <FaUser /> RegisterUser
        </h1>
      </section>
      <section>
        <div className='input-icon'>
        <form className="form" onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              id="userName"
              className="form-control"
              value={name}
              name="userName"
              placeholder="Enter User Name"
              onChange={onchange}
            /><FaUser  className='icon'/>
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
            /><FaUser  className='icon'/>
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
            /><FaUser  className='icon'/>
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
            /><FaUser  className='icon'/>
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
