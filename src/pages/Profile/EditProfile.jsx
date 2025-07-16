import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  updateProfile,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential
} from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../services/firebase";
import styles from './EditProfile.module.css';

export default function EditProfile({ onDone }) {
  const { user, userData, setUserData } = useAuth();

  const [name, setName] = useState(userData?.name || "");
  const [bio, setBio] = useState(userData?.bio || "");
  const [profilePic, setProfilePic] = useState(userData?.profilePic || "");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, { name, bio, profilePic });

      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: profilePic,
      });

      setUserData((prev) => ({ ...prev, name, bio, profilePic }));
      setMessage("✅ Profile updated successfully!");
      if (onDone) onDone(); // Close edit menu
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to update profile: " + err.message);
    }
    setLoading(false);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!oldPassword || !newPassword) {
      setMessage("❗ Both passwords are required.");
      setLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setMessage("❗ Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    try {
      const credential = EmailAuthProvider.credential(user.email, oldPassword);
      await reauthenticateWithCredential(auth.currentUser, credential);

      await updatePassword(auth.currentUser, newPassword);
      setOldPassword("");
      setNewPassword("");
      setMessage("🔐 Password updated successfully!");
    } catch (err) {
      console.error(err);
      setMessage("❌ Password update failed: " + err.message);
    }
    setLoading(false);
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.heading}>Edit Profile</h2>

      {message && (
        <div
          className={`${styles.message} ${
            message.startsWith("✅") || message.startsWith("🔐")
              ? styles.success
              : styles.error
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleProfileUpdate} className={styles.formGroup}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Name</label>
          <input
            type="text"
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Bio</label>
          <textarea
            className={styles.textarea}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Profile Picture URL</label>
          <input
            type="text"
            className={styles.input}
            value={profilePic}
            onChange={(e) => setProfilePic(e.target.value)}
          />
          {profilePic && (
            <img
              src={profilePic}
              alt="Preview"
              className={styles.previewImage}
            />
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={styles.button}
        >
          Save Profile
        </button>
      </form>

      <h3 className={styles.sectionTitle}>Change Password</h3>

      <form onSubmit={handlePasswordChange} className={styles.formGroup}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Current Password</label>
          <input
            type="password"
            className={styles.input}
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>New Password</label>
          <input
            type="password"
            className={styles.input}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={styles.button}
        >
          Change Password
        </button>
      </form>
    </div>
  );
}
