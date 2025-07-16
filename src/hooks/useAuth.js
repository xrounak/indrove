// src/hooks/useAuthActions.js
import {
  loginWithEmail,
  signUpWithEmail,
  loginWithGoogle,
  logoutUser,
  sendResetEmail,
  sendVerificationEmail,
} from "../services/authService";
import { useAuth } from "../context/AuthContext";

export const useAuthActions = () => {
  const { setLoading } = useAuth();

  const handleWithLoading = async (fn) => {
    try {
      setLoading(true);
      return await fn();
    } finally {
      setLoading(false);
    }
  };

  return {
    loginWithEmailAndPassword: (email, password) =>
      handleWithLoading(() => loginWithEmail(email, password)),

    registerWithEmailAndPassword: (email, password, role) =>
      handleWithLoading(() => signUpWithEmail(email, password, role)),

    signInWithGoogle: (role) => handleWithLoading(() => loginWithGoogle(role)),

    logout: () => handleWithLoading(() => logoutUser()),

    sendResetEmail: (email) => sendResetEmail(email),

    sendEmailVerificationToUser: () =>
      handleWithLoading(() => {
        console.log("sending mail")
        sendVerificationEmail();
        console.log("sent the mail")

      }),
  };
};
