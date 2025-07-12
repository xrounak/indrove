// src/routes/AppRoutes.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "../features/auth/pages/Auth";
import { ProtectedRoute } from "./ProtectedRoute";
import HireRoutes from "./Hire";
import WorkRoutes from "./Work";
import Home from "../components/Home/Home";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />}></Route>
      <Route path="/auth" element={<Auth />} />

      {/* Client Routes */}
      <Route
        path="/HireRoutes/*"
        element={
          <ProtectedRoute role="client">
            <HireRoutes />
          </ProtectedRoute>
        }
      />

      {/* Freelancer Routes */}
      <Route
        path="/WorkRoutes/*"
        element={
          <ProtectedRoute role="freelancer">
            <WorkRoutes />
          </ProtectedRoute>
        }
      />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/auth" />} />
    </Routes>
  );
}
