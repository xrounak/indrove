// src/routes/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function ProtectedRoute({ children, role }) {
  const { user, userData } = useAuth();

  if (!user) return <Navigate to="/auth" replace />;
  if (role && userData?.role !== role) return <Navigate to="/" replace />;

  return children;
}