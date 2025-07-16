import { createContext, useContext, useEffect, useState } from "react";
import { observeAuthState, getUserData } from "../services/authService";
import { auth } from "../services/firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);              // Firebase Auth User
  const [userData, setUserData] = useState(null);      // Firestore User Profile
  const [emailVerified, setEmailVerified] = useState(false); // Email verified status
  const [loading, setLoading] = useState(true);        // Global loading state

  useEffect(() => {
    console.log("🔄 AuthContext mounted");

    const unsubscribe = observeAuthState(async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        // Always reload user to get fresh `emailVerified` value
        await currentUser.reload();

        setEmailVerified(currentUser.emailVerified);

        const data = await getUserData(currentUser.uid);
        setUserData(data);
      } else {
        setUserData(null);
        setEmailVerified(false);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        userData,
        emailVerified,
        loading,
        setUser,
        setUserData,
        setLoading,
        setEmailVerified,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
