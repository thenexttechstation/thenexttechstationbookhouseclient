import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { isSocialAuthenticated } from "../bookhouseapi/Bookhouseuserapi";

const SocialUserRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        isSocialAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/sociallogin",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default SocialUserRoute;
