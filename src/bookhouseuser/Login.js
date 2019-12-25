import React, { useState } from "react";
import BookHouseLayout from "../bookhousecore/BookhouseLayout";
import { Link, Redirect } from "react-router-dom";
import {
  loginUser,
  authenticateUser,
  isAuthenticated
} from "../bookhouseapi/Bookhouseuserapi";
import BookHouseMenu from "../bookhousecore/BookHouseMenu";
import { VpnKey, LockOpen, Email } from "../../node_modules/@material-ui/icons";
const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    redirectToReferrer: false
  });

  const { email, password, loading, error, redirectToReferrer } = values;
  const { bookhouseuser } = isAuthenticated();

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const callLoginAPI = event => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    loginUser({ email: email, password: password }).then(logindata => {
      console.log("Inside logindata");
      if (logindata.error) {
        setValues({
          ...values,
          error: logindata.error,
          loading: false
        });
      } else {
        console.log("inside else of callLoginAPI");
        console.log("LOGINDATA" + JSON.stringify(logindata));
        authenticateUser(logindata, () => {
          setValues({
            ...values,
            redirectToReferrer: true
          });
        });
      }
    });
  };
  const LoginForm = () => (
    <form>
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
        <label className="text-muted">
          <VpnKey></VpnKey>Password
        </label>
        <input
          onChange={handleChange("password")}
          type="password"
          className="form-control"
          value={password}
        />
      </div>
      <button onClick={callLoginAPI} className="btn btn-primary">
        <label>Login</label>
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

  const displayLoadingMessage = () =>
    loading && (
      <div className="alert alert-info">
        <h2>Loading to BookHouse</h2>
      </div>
    );

  const redirectAfterLogin = () => {
    if (redirectToReferrer) {
      if (bookhouseuser && bookhouseuser.userrole === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/bookhouseuser/dashboard" />;
      }
    }
  };

  const Loginnewform = () => (
    <div>
      <BookHouseMenu></BookHouseMenu>
      <div className="login-container">
        <form action="" className="form-login">
          <ul className="login-nav">
            <li className="login-nav__item active">
              <a href="#">
                <h2>Sign In</h2>
              </a>
            </li>
            <li className="login-nav__item">
              <a href="/sociallogin">
                <h2>Social Sign In</h2>
              </a>
            </li>
          </ul>
          <label className="login__label">
            <Email></Email>Email
          </label>
          <input
            onChange={handleChange("email")}
            type="email"
            className="form-control"
            value={email}
          />
          <br></br>
          <br></br>
          <label className="login__label">
            {" "}
            <VpnKey></VpnKey>Password
          </label>
          <input
            onChange={handleChange("password")}
            type="password"
            className="form-control"
            value={password}
          />
          <br></br>

          <button onClick={callLoginAPI} className="login__submit">
            <LockOpen></LockOpen>
            Login
          </button>
        </form>
        <a href="/register" className="login__forgot">
          <h4>New User Register</h4>
        </a>
      </div>
    </div>
  );
  return (
    <div>
      {displayLoadingMessage()}
      {displayErrorMessage()}

      {Loginnewform()}
      {redirectAfterLogin()}
    </div>
  );
};

export default Login;
