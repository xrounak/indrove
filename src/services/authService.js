// src/services/authService.js
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  deleteUser
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./firebase";
import { toast } from "react-toastify";

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

export const loginWithGoogle = async (role) => {
  console.log("🔑 Starting Google sign-in process...");

  const result = await signInWithPopup(auth, googleProvider);
  const user = result.user;

  console.log("✅ Firebase Auth success");
  console.log("👤 User UID:", user.uid);
  console.log("📧 Email:", user.email);
  console.log("🔒 Role passed:", role);

  const userRef = doc(db, "users", user.uid);
  const snap = await getDoc(userRef);

  if (snap.exists()) {
    console.log("🧠 User already exists in Firestore.");
    return user;
  }

  if (role === "client" || role === "freelancer") {
    console.log("🆕 New user, role is valid. Registering in Firestore...");

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

    console.log("✅ Firestore registration complete.");
    return user;
  }

  // ❌ Invalid role, user is new, delete from Auth and show toast
  console.warn("❌ Invalid role passed. Deleting Firebase Auth user...");

  await deleteUser(user);
  toast.error("🚫 Account does not exist. Please register first.");

  throw new Error("Invalid role. Account not created.");
};



// 🚪 Logout
export const logoutUser = async () => {
  console.log("logging out");
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
