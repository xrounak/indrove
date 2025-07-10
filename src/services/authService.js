// src/services/authService.js
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./firebase";

const googleProvider = new GoogleAuthProvider();

// 📥 Email/Password Signup
export const signUpWithEmail = async (email, password, role) => {
  const userCred = await createUserWithEmailAndPassword(auth, email, password);

  await setDoc(doc(db, "users", userCred.user.uid), {
    uid: userCred.user.uid,
    email,
    role,
    createdAt: serverTimestamp(),
    name: "your_name",
    profilePic: "https://i.imgur.com/6VBx3io.png",
    bio: ":-)",
    rating: 0,
  });
  return userCred.user;
};

// 🔐 Email/Password Login
export const loginWithEmail = async (email, password) => {
  const userCred = await signInWithEmailAndPassword(auth, email, password);
  return userCred.user;
};

// 🔑 Google Login (Handles register + login)
// 🔑 Google Login (Handles register + login)
export const loginWithGoogle = async (role = "client") => {
  const result = await signInWithPopup(auth, googleProvider);
  const user = result.user;

  const userRef = doc(db, "users", user.uid);
  const snap = await getDoc(userRef);

  if (!snap.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email,
      name: user.displayName || "",
      role: role,
      createdAt: serverTimestamp(),
      profilePic: user.photoURL || "https://i.imgur.com/6VBx3io.png",
      bio: ":-)",
      rating: 0,
    });
  }

  return user;
};

// 🚪 Logout
export const logoutUser = async () => {
  console.log("logging out")
  await signOut(auth);
};

// 🧠 Auth Listener
export const observeAuthState = (callback) => {
  return onAuthStateChanged(auth, callback);
};

// 🔎 Get Firestore User Data
export const getUserData = async (uid) => {
  const docRef = doc(db, "users", uid);
  const snap = await getDoc(docRef);
  return snap.exists() ? snap.data() : null;
};
