// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/analytics";
import "firebase/compat/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjZQ1kPiFUcYEUKOxPnk4BPG_7oMNj5QQ",
  authDomain: "project-productivity-ed331.firebaseapp.com",
  projectId: "project-productivity-ed331",
  storageBucket: "project-productivity-ed331.appspot.com",
  messagingSenderId: "261215620166",
  appId: "1:261215620166:web:bc0f5f3c0c58a4643c4e47",
  measurementId: "G-QYPTBVTDVZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;