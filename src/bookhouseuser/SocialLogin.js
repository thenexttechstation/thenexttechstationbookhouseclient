import React, { useState, useEffect } from "react";
import BookHouseLayout from "../bookhousecore/BookhouseLayout";
import { Link, Redirect } from "react-router-dom";
import BookHouseMenu from "../bookhousecore/BookHouseMenu";
import {
  Facebook,
  Twitter,
  GitHub,
  GTranslate
} from "../../node_modules/@material-ui/icons";

import {
  loginUser,
  authenticateUser,
  isAuthenticated,
  authenticateSocialUser,
  validateandwriteinUserDB,
  isSocialAuthenticated,
  createanuserentry
} from "../bookhouseapi/Bookhouseuserapi";

import * as firebase from "firebase/app";
import { firebaseConfig } from "../firebaseConfig";
// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

const SocialLogin = props => {
  var user = isSocialAuthenticated();
  const { displayName, email, photoURL, lastLoginAt } = user;

  if (!firebase.apps.length) {
    try {
      firebase.initializeApp(firebaseConfig);
    } catch (err) {
      console.error("Firebase initialization error raised", +err.stack);
    }
  }

  const GoogleSignIn = event => {
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        console.log("Inside googlelogindata");
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        //const { email, uid, displayName } = user;
        const {
          providerData: [{ providerId, uid, displayName, email }]
        } = user;
        console.log("providerId" + providerId);
        const password = "test";
        const username = displayName;
        if (user) {
          console.log("hello here" + email);
          console.log("hello here1" + uid);
          console.log("hello here1" + displayName);

          console.log("hello last" + JSON.stringify(user));

          authenticateSocialUser(user, () => {});

          createanuserentry({
            email: email,
            password: password,
            username: displayName,
            provider: "Google"
          });
          loginUser({ email: email, password: password }).then(logindata => {
            console.log("Inside logindata");
            if (logindata.error) {
            } else {
              console.log("inside else of callLoginAPI");
              console.log("LOGINDATA" + JSON.stringify(logindata));
              authenticateUser(logindata, () => {});
            }
          });
          redirectAfterLogin();
        }

        // ...
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  };

  const TwitterSignIn = event => {
    var provider = new firebase.auth.TwitterAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
        // You can use these server side with your app's credentials to access the Twitter API.
        var token = result.credential.accessToken;
        var secret = result.credential.secret;
        // The signed-in user info.
        var user = result.user;
        console.log("hello last" + JSON.stringify(user));

        authenticateSocialUser(user, () => {});

        redirectAfterLogin();
        // ...
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  };

  const GithubSignIn = event => {
    var provider = new firebase.auth.GithubAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log("hello last" + JSON.stringify(user));

        authenticateSocialUser(user, () => {});

        redirectAfterLogin();
        // ...
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        console.log("hello last" + error.message);

        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  };

  const MicrosoftSignIn = event => {
    var provider = new firebase.auth.OAuthProvider("microsoft.com");
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        var user = result.user;
        console.log("hello last" + JSON.stringify(user));

        authenticateSocialUser(user, () => {});

        redirectAfterLogin();
        // User is signed in.
        // IdP data available in result.additionalUserInfo.profile.
        // OAuth access token can also be retrieved:
        // result.credential.accessToken
        // OAuth ID token can also be retrieved:
        // result.credential.idToken
      })
      .catch(function(error) {
        var errorCode = error.code;
        console.log("hello last" + error.message);
        // Handle error.
      });
  };

  const YahooSignIn = event => {
    var provider = new firebase.auth.OAuthProvider("yahoo.com");
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        var user = result.user;
        console.log("hello last" + JSON.stringify(user));

        authenticateSocialUser(user, () => {});

        redirectAfterLogin();
        // User is signed in.
        // IdP data available in result.additionalUserInfo.profile.
        // Yahoo OAuth access token can be retrieved by calling:
        // result.credential.accessToken
        // Yahoo OAuth ID token can be retrieved by calling:
        // result.credential.idToken
      })
      .catch(function(error) {
        var errorCode = error.code;
        console.log("hello last" + error.message);
        // Handle error.
      });
  };

  const MobileSignIn = event => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: function(response) {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          var phoneNumber = "9895704540";
          var appVerifier = window.recaptchaVerifier;
          firebase
            .auth()
            .signInWithPhoneNumber(phoneNumber, appVerifier)
            .then(function(confirmationResult) {
              // SMS sent. Prompt user to type the code from the message, then sign the
              // user in with confirmationResult.confirm(code).
              window.confirmationResult = confirmationResult;
            })
            .catch(function(error) {
              // Error; SMS not sent
              // ...
            });
        }
      }
    );
  };
  const FaceBookSignIn = event => {
    var provider = new firebase.auth.FacebookAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        authenticateSocialUser(user, () => {});

        redirectAfterLogin();
        // ...
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  };
  const shouldRedirect = () => {
    props.history.push("/mobileauth");
  };
  const redirectAfterLogin = () => {
    console.log("in redirect");
    props.history.push("/bookhousesocialuser/dashboard/");
    //return <Redirect to="/admin/dashboard" />;
  };

  const SocialLoginNewForm = () => (
    <div>
      <div className="login-container">
        <form action="" className="form-login">
          <ul className="login-nav">
            <li className="login-nav__item active">
              <a href="/login">
                <h4>Sign In</h4>
              </a>
            </li>
            <li className="login-nav__item">
              <a href="/sociallogin">
                <h4>Social Sign In</h4>
              </a>
            </li>
          </ul>

          <button
            type="button"
            onClick={GoogleSignIn}
            className="btn btn-danger btn-lg btn-block"
          >
            <GTranslate></GTranslate>Google
          </button>
          <br></br>
          <button
            onClick={FaceBookSignIn}
            type="button"
            className="btn btn-primary btn-lg btn-block"
          >
            <Facebook></Facebook> FaceBook
          </button>
          <br></br>
          <button
            type="button"
            onClick={TwitterSignIn}
            className="btn btn-success btn-lg btn-block"
          >
            <Twitter></Twitter> Twitter
          </button>
          <br></br>

          <button
            onClick={GithubSignIn}
            type="button"
            className="btn btn-dark btn-lg btn-block"
          >
            <GitHub></GitHub> Github
          </button>
          <br></br>

          <button
            onClick={MicrosoftSignIn}
            type="button"
            className="btn btn-secondary btn-lg btn-block"
          >
            Microsoft
          </button>
          <br></br>

          <button
            onClick={YahooSignIn}
            type="button"
            className="btn btn-white btn-lg btn-block"
          >
            Yahoo
          </button>
          <button
            onClick={shouldRedirect}
            type="button"
            className="btn btn-primary btn-lg btn-block"
          >
            Mobile Authentication
          </button>
        </form>
        <a href="/register" className="login__forgot">
          <h4>Register</h4>
        </a>
      </div>
    </div>
  );
  const SocialLoginForm = () => (
    <div>
      <button
        onClick={GoogleSignIn}
        className="btn btn-danger btn-lg btn-block"
      >
        <label>Google Login</label>
      </button>
      <button
        onClick={FaceBookSignIn}
        type="button"
        disabled="true"
        className="btn btn-primary btn-lg btn-block"
      >
        <label>Face Book Login</label>
      </button>
      <button
        type="button"
        onClick={TwitterSignIn}
        className="btn btn-success btn-lg btn-block"
      >
        <label>TwitterLogin</label>
      </button>
      <button
        onClick={GithubSignIn}
        type="button"
        className="btn btn-dark btn-lg btn-block"
      >
        <label>Github</label>
      </button>
      <button
        onClick={YahooSignIn}
        type="button"
        className="btn btn-white btn-lg btn-block"
      >
        <label>Yahoo</label>
      </button>

      <button
        onClick={MicrosoftSignIn}
        type="button"
        className="btn btn-secondary btn-lg btn-block"
      >
        <label>Microsoft</label>
      </button>
      <button
        onClick={MobileSignIn}
        type="button"
        className="btn btn-info btn-lg btn-block"
      >
        <label>Mobile</label>
      </button>
    </div>
  );

  return (
    <div>
      <BookHouseMenu></BookHouseMenu>

      <main id="main" class="d-flx bg-full" role="main">
        {SocialLoginNewForm()}
      </main>
    </div>
  );
};

export default SocialLogin;
