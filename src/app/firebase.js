// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpI-gyuobsARJW1H2fclaMtIw1dbd7NAk",
  authDomain: "spacex-launch-dashboard-7d56c.firebaseapp.com",
  projectId: "spacex-launch-dashboard-7d56c",
  storageBucket: "spacex-launch-dashboard-7d56c.appspot.com",
  messagingSenderId: "241285681762",
  appId: "1:241285681762:web:af890e1af214627f46f73b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
