// src/services/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyChFOYeH4PgxT3Hg6OHI9-93FzqdXZA38w",
  authDomain: "unknown-indrove.firebaseapp.com",
  projectId: "unknown-indrove",
  storageBucket: "unknown-indrove.firebasestorage.app",
  messagingSenderId: "1086003844317",
  appId: "1:1086003844317:web:bf5b5f90fbd6791c403734",
  measurementId: "G-156CJ3N4B6"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export default app;
