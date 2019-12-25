import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import {
  logout,
  isAuthenticated,
  isSocialAuthenticated,
  sociallogout
} from "../bookhouseapi/Bookhouseuserapi";
import { itemTotal } from "./Cart";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#760B0B" };
  } else {
    return { color: "#ffffff" };
  }
};

const BookHouseMenu = ({ history }) => (
  <div>
    <ul className="nav nav-tabs bg-light">
      <li className="nav-item">
        <Link className="nav-link" style={isActive(history, "/")} to="/">
          <h3>Home</h3>
        </Link>
      </li>

      <li className="nav-item">
        <Link
          className="nav-link"
          style={isActive(history, "/bookshop")}
          to="/bookshop"
        >
          <h3>Book Shop</h3>
        </Link>
      </li>

      <li className="nav-item">
        <Link
          className="nav-link"
          style={isActive(history, "/cart")}
          to="/cart"
        >
          <h3>
            Cart<ShoppingCartIcon></ShoppingCartIcon>
            <sup>
              <small className="cart-badge">{itemTotal()}</small>
            </sup>
          </h3>
        </Link>
      </li>
      {isAuthenticated() && isAuthenticated().bookhouseuser.userrole === 0 && (
        <li className="nav-item">
          <Link
            className="nav-link"
            style={isActive(history, "/user/dashboard")}
            to="/bookhouseuser/dashboard"
          >
            <h3>User Dashboard</h3>
          </Link>
        </li>
      )}

      {isAuthenticated() && isAuthenticated().bookhouseuser.userrole === 1 && (
        <li className="nav-item">
          <Link
            className="nav-link"
            style={isActive(history, "/admin/dashboard")}
            to="/admin/dashboard"
          >
            <h3>Admin Dashboard</h3>
          </Link>
        </li>
      )}

      {isSocialAuthenticated() && (
        <li className="nav-item">
          <Link
            className="nav-link"
            style={isActive(history, "bookhousesocialuser/dashboard/")}
            to="bookhousesocialuser/dashboard/"
          >
            <h3>Social User Dashboard</h3>
          </Link>
        </li>
      )}

      {!isAuthenticated() && !isSocialAuthenticated() && (
        <Fragment>
          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, "/login")}
              to="/login"
            >
              <h3>Login</h3>
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, "/register")}
              to="/register"
            >
              <h3>Register</h3>
            </Link>
          </li>
        </Fragment>
      )}

      {!isSocialAuthenticated() && !isAuthenticated() && (
        <Fragment>
          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, "/sociallogin")}
              to="/sociallogin"
            >
              <h3>Social Login</h3>
            </Link>
          </li>
        </Fragment>
      )}

      {isAuthenticated() && (
        <Fragment>
          <li className="nav-item">
            <span
              className="nav-link"
              style={{ cursor: "pointer", color: "#E88014" }}
              onClick={() =>
                logout(() => {
                  history.push("/login");
                })
              }
            >
              <h3>LogOut</h3>
            </span>
          </li>
        </Fragment>
      )}
      {isSocialAuthenticated() && (
        <Fragment>
          <li className="nav-item">
            <span
              className="nav-link"
              style={{ cursor: "pointer", color: "#E88014" }}
              onClick={() =>
                sociallogout(() => {
                  history.push("/");
                })
              }
            >
              <h3>SocialLogOut</h3>
            </span>
          </li>
        </Fragment>
      )}
      <div class="d-flex p-3 bg-dark text-white">
        <div class="p-2 bg-info">
          <h4>Book House-The NextTechStation Innovation</h4>
        </div>
      </div>

      <li className="nav-item">
        <Link
          className="nav-link"
          style={isActive(history, "/search")}
          to="/search"
        >
          <h3>Search Book</h3>
        </Link>
      </li>

      <li className="nav-item">
        <Link
          className="nav-link"
          style={isActive(history, "/editorspick")}
          to="/editorspick"
        >
          <h3>Editors Pick</h3>
        </Link>
      </li>
      <li className="nav-item">
        <Link
          className="nav-link"
          style={isActive(history, "/catalog")}
          to="/catalog"
        >
          <h3>Catalog</h3>
        </Link>
      </li>
    </ul>
  </div>
);

export default withRouter(BookHouseMenu);
