
import firebase from "firebase/compat/app";
import { getDatabase, ref } from 'firebase/compat/database';
const firebaseConfig = {
  apiKey: "AIzaSyC_sYY0M-nTG_XMl19epxQa0f04L1cTRTk",
  authDomain: "test-c9b94.firebaseapp.com",
  databaseURL: "https://test-c9b94-default-rtdb.firebaseio.com",
  projectId: "test-c9b94",
  storageBucket: "test-c9b94.appspot.com",
  messagingSenderId: "367803923678",
  appId: "1:367803923678:web:c2b636540e222de793564f"
};

// Initialize Firebase
var firebaseDB = firebase.initializeApp(firebaseConfig);
export default firebaseDB.database().ref();
