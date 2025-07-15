// src/hooks/useProfile.js
import { useState } from "react";
import { updateUserProfile, getUserProfile } from "../services/userService";

export const useProfile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateProfile = async (uid, data) => {
    setLoading(true);
    setError(null);
    try {
      await updateUserProfile(uid, data);
    } catch (err) {
      console.error("Profile update failed:", err);
      setError("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const fetchProfile = async (uid) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getUserProfile(uid);
      return data;
    } catch (err) {
      setError("Failed to fetch profile");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    updateProfile,
    fetchProfile,
    loading,
    error,
  };
};
