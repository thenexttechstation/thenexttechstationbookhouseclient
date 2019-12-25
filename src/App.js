import React from "react";
import { firebaseConfig } from "./firebaseConfig";
import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
const App = () => <div>The Next Tech Station</div>;

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default App;
