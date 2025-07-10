// src/routes/AppRoutes.jsx
import { Routes, Route, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useAuthActions } from "../hooks/useAuth";
import { Layout } from "./Layout";
import Auth from "../features/auth/pages/Auth";
import { TestBoard } from "./TestBoard";
import { useUILoading } from "../context/UILoadingContext ";

export default function AppRoutes() {
  const navigate = useNavigate();
  const { user, userData } = useAuth();
  const { logout } = useAuthActions();
  const { startLoading, stopLoading } = useUILoading();

  const redirectToAuth = () => {
    startLoading();
    console.log("Redirecting to /auth");
    navigate("/auth", { replace: true });
    stopLoading();
  };

  return (
    <Layout>
      <Routes>
        {/* Auth Page */}
        <Route path="/auth" element={<Auth />} />

        {/* Not logged in */}
        {!user && (
          <Route
            path="*"
            element={
              <TestBoard
                user={null}
                userData={null}
                vistauth={redirectToAuth}
              />
            }
          />
        )}

        {/* Client Dashboard */}
        {user && userData?.role === "client" && (
          <Route
            path="/*"
            element={
              <TestBoard
                user={user}
                userData={userData}
                onClick={logout}
              />
            }
          />
        )}

        {/* Freelancer Dashboard */}
        {user && userData?.role === "freelancer" && (
          <Route
            path="/*"
            element={
              <TestBoard
                user={user}
                userData={userData}
                onClick={logout}
              />
            }
          />
        )}
      </Routes>
    </Layout>
  );
}
