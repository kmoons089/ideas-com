import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

import { initializeFirestore } from "firebase/firestore";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCURiNqAXCEG5n3uHq_sjQD4IMjd8bbvSI",
  authDomain: "crwud-90d47.firebaseapp.com",
  databaseURL: "https://crwud-90d47-default-rtdb.firebaseio.com",
  projectId: "crwud-90d47",
  storageBucket: "crwud-90d47.appspot.com",
  messagingSenderId: "968352099751",
  appId: "1:968352099751:web:b2f23ae732b00c04d2da82",
};

// Initialize Firebase

const firebaseApp = firebase.initializeApp(firebaseConfig);
// const db = initializeFirestore(firebaseApp, {
//   experimentalForceLongPolling: true,
// });
const db = firebaseApp.firestore();
export { db };

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage(app);
