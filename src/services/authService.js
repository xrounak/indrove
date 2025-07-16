import {
  auth,
  db
} from "./firebase";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  deleteUser,
  sendPasswordResetEmail,
  sendEmailVerification
} from "firebase/auth";

import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp
} from "firebase/firestore";

import { toast } from "react-toastify";

const googleProvider = new GoogleAuthProvider();


// ==========================
// 🟩 SIGNUP & LOGIN METHODS
// ==========================

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

  const userRef = doc(db, "users", user.uid);
  const snap = await getDoc(userRef);

  if (snap.exists()) {
    console.log("🧠 User already exists in Firestore.");
    return user;
  }

  if (role === "client" || role === "freelancer") {
    console.log("🆕 New user. Registering in Firestore...");

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

    return user;
  }

  // ❌ Invalid role passed
  await deleteUser(user);
  toast.error("🚫 Account does not exist. Please register first.");
  throw new Error("Invalid role. Account not created.");
};


// ==========================
// 🔁 SESSION & AUTH STATE
// ==========================

// 🚪 Logout
export const logoutUser = async () => {
  console.log("🚪 Logging out...");
  await signOut(auth);
};

// 🧠 Auth Listener
export const observeAuthState = (callback) => {
  return onAuthStateChanged(auth, callback);
};


// ==========================
// 📄 USER DATA & UTILITIES
// ==========================

// 🔎 Get Firestore User Data
export const getUserData = async (uid) => {
  const docRef = doc(db, "users", uid);
  const snap = await getDoc(docRef);
  return snap.exists() ? snap.data() : null;
};

// 📧 Send Reset Email
export const sendResetEmail = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("🔁 Password reset email sent!");
  } catch (error) {
    console.error("❌ Error sending reset email:", error.message);
  }
};

// 📨 Send Email Verification
export const sendVerificationEmail = async () => {
  if (!auth.currentUser) {
    throw new Error("No user is currently signed in.");
  }
  console.log("📧 Sending email verification to:", auth.currentUser.email);
  return await sendEmailVerification(auth.currentUser);
};
