// src/routes/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loader from '../components/feedback/Loader'

export function ProtectedRoute({ children, role }) {
  const { user, userData,loading } = useAuth();

  if(loading) return <Loader/>

  if (!user) return <Navigate to="/auth" replace />;
  if (role && userData?.role !== role) return <Navigate to="/" replace />;

  return children;
}