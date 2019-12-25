import React, { useState } from "react";
import BookHouseLayout from "../bookhousecore/BookhouseLayout";
import { Link } from "react-router-dom";
import { registerUser } from "../bookhouseapi/Bookhouseuserapi";
import BookHouseMenu from "../bookhousecore/BookHouseMenu";

const Register = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    error: "",
    success: false,
    provider: ""
  });

  const { username, email, password, success, error, provider } = values;

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const callRegisterationAPI = event => {
    event.preventDefault();
    setValues({ ...values, error: false });
    registerUser({
      username: username,
      email: email,
      password: password,
      provider: "bookhouse"
    }).then(registrationdata => {
      if (registrationdata.error) {
        setValues({
          ...values,
          error: registrationdata.error,
          success: false
        });
      } else {
        setValues({
          ...values,
          username: "",
          email: "",
          password: "",
          success: true,
          error: ""
        });
      }
    });
  };

  const registrationNewForm = () => (
    <div>
      <BookHouseMenu></BookHouseMenu>
      <div className="login-container">
        <form action="" className="form-login">
          <ul className="login-nav">
            <li className="login-nav__item active">
              <a href="#">
                <h4>Register</h4>
              </a>
            </li>
            <li className="login-nav__item">
              <a href="/sociallogin">
                <h4>Social Sign In</h4>
              </a>
            </li>
          </ul>
          <label className="login__label">Username</label>
          <input
            onChange={handleChange("username")}
            type="text"
            className="form-control"
            value={username}
          />
          <br></br>
          <br></br>
          <label className="login__label">Email</label>
          <input
            onChange={handleChange("email")}
            type="email"
            className="form-control"
            value={email}
          />
          <br></br>
          <label className="login__label">Password</label>
          <input
            onChange={handleChange("password")}
            type="password"
            className="form-control"
            value={password}
          />
          <br></br>

          <button onClick={callRegisterationAPI} className="login__submit">
            Login
          </button>
        </form>
        <a href="/login" className="login__forgot">
          <h4>Already an User!</h4>
        </a>
      </div>
    </div>
  );
  const registrationForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">User Name</label>
        <input
          onChange={handleChange("username")}
          type="text"
          className="form-control"
          value={username}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          onChange={handleChange("email")}
          type="email"
          className="form-control"
          value={email}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          onChange={handleChange("password")}
          type="password"
          className="form-control"
          value={password}
        />
      </div>
      <button onClick={callRegisterationAPI} className="btn btn-primary">
        <label>Register</label>
      </button>
    </form>
  );

  const displayErrorMessage = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const displaySuccessMessage = () => (
    <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}
    >
      Registration Successfull. Please <Link to="/login">Login</Link>
    </div>
  );

  return (
    <div>
      {displayErrorMessage()}
      {displaySuccessMessage()}

      {registrationNewForm()}
    </div>
  );
};

export default Register;
