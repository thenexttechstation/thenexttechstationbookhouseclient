import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";

import BookhouseLayout from "./BookhouseLayout";
import * as firebase from "firebase/app";
import { firebaseConfig } from "../firebaseConfig";
import {
  createanuserentry,
  loginUser,
  authenticateUser
} from "../bookhouseapi/Bookhouseuserapi";
// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
const MobileAuthComponent = props => {
  const [values, setValues] = useState({
    phoneno: ""
  });
  const [redirect, setRedirect] = useState(false);

  const redirectAfterLogin = redirect => {
    props.history.push("/bookhousesocialuser/dashboard/");

    //return <Redirect to="/admin/dashboard" />;
  };
  const clickSubmit = e => {
    console.log("hello" + phoneno);
    var mobileno = "+91" + phoneno;
    var provider = new firebase.auth.PhoneAuthProvider();
    var applicationVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container"
    );
    provider
      .verifyPhoneNumber(mobileno, applicationVerifier)
      .then(function(verificationId) {
        console.log("verificationIsd" + verificationId);
        var verificationCode = window.prompt("please enter verification code");
        return firebase.auth.PhoneAuthProvider.credential(
          verificationId,
          verificationCode
        );
      })
      .then(function(phoneCredential) {
        return firebase.auth().signInWithCredential(phoneCredential);
      })
      .then(function(result) {
        var user = result.user;
        console.log("uSER" + JSON.stringify(user));
        const {
          providerData: [{ providerId, uid, phoneNumber }]
        } = user;
        const password = "test";
        const username = phoneNumber;
        const email = +phoneNumber + "@" + "bookhouse.com";
        createanuserentry({
          email: email,
          password: password,
          username: username,
          provider: "Mobile"
        });
        loginUser({ email: email, password: password }).then(logindata => {
          console.log("Inside logindata");
          if (logindata.error) {
          } else {
            console.log("inside else of callLoginAPI");
            console.log("LOGINDATA" + JSON.stringify(logindata));
            setRedirect(true);
            authenticateUser(logindata, () => {});
            redirectAfterLogin();
          }
        });
      });
  };
  if (!firebase.apps.length) {
    try {
      firebase.initializeApp(firebaseConfig);
    } catch (err) {
      console.error("Firebase initialization error raised", +err.stack);
    }
  }

  const { phoneno } = values;
  const handleChange = name => e => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };
  return (
    <div>
      <BookhouseLayout></BookhouseLayout>
      <div>
        <h3>Mobile Number</h3>
        <input
          type="text"
          onChange={handleChange("phoneno")}
          className="form-control"
          value={phoneno}
        />
      </div>
      <button onClick={clickSubmit} className="btn btn-primary">
        <label>Authenticate</label>
      </button>
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default MobileAuthComponent;
