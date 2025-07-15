// src/routes/AppRoutes.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "../pages/auth/Auth";
import { ProtectedRoute } from "./ProtectedRoute";
import HireRoutes from "./Hire";
import WorkRoutes from "./Work";
import Home from '../pages/Home/Home'
import About from "../components/About/About";
import Profile from "../pages/Profile/Profile";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />}></Route>
      <Route path="/auth" element={<Auth />} />
      <Route path="/about" element={<About />} />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile></Profile>
          </ProtectedRoute>
        }
      />

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
