// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { observeAuthState, getUserData } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Firebase Auth User
  const [userData, setUserData] = useState(null); // Firestore User Profile
  const [loading, setLoading] = useState(true); // Global loading state

  useEffect(() => {
    console.log("rendering context")
    const unsubscribe = observeAuthState(async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const data = await getUserData(currentUser.uid);
        setUserData(data);
      } else {
        setUserData(null);
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
        loading,
        setLoading,
        setUser,
        setUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);