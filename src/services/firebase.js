// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // Import Firebase Authentication
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChFOYeH4PgxT3Hg6OHI9-93FzqdXZA38w",
  authDomain: "unknown-indrove.firebaseapp.com",
  projectId: "unknown-indrove",
  storageBucket: "unknown-indrove.firebasestorage.app",
  messagingSenderId: "1086003844317",
  appId: "1:1086003844317:web:bf5b5f90fbd6791c403734",
  measurementId: "G-156CJ3N4B6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export default app;
