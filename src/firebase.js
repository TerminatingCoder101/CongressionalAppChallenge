import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfJILG9RcGRXdpDsh1XcYOoXTD3wJ5EPM",
  authDomain: "congression-app-challenge.firebaseapp.com",
  projectId: "congression-app-challenge",
  storageBucket: "congression-app-challenge.appspot.com",
  messagingSenderId: "871024105253",
  appId: "1:871024105253:web:d6dede0dffd2fea841eccc",
  measurementId: "G-3ZWDY087JC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);