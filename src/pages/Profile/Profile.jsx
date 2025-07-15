import React from "react";
import { useAuth } from "../../context/AuthContext";
import styles from "./Profile.module.css";
import { useNavigate } from "react-router-dom";
import { useAuthActions } from "../../hooks/useAuth";

export default function Profile() {
  const { userData,user } = useAuth();
  const navigate = useNavigate();
  const { logout } = useAuthActions();

  const handleEdit = () => {
    navigate("/profile/edit");
  };


      return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>My Profile</h1>

        {/* Avatar & Basic Info */}
        <div className={styles.avatarSection}>
          <img
            className={styles.avatar}
            src={user?.photoURL || "/default-avatar.png"}
            alt="User Avatar"
          />
          <div className={styles.nameEmail}>
            <h2>{userData?.name || "Unnamed User"}</h2>
            <p>{userData?.email}</p>
            <span className={styles.roleBadge}>
              {userData?.role === "freelancer" ? "🎓 Freelancer" : "📌 Client"}
            </span>
          </div>
        </div>

        {/* Profile Info Section */}
        <div className={styles.infoGrid}>
          <div>
            <h3>Bio</h3>
            <p>{userData?.bio || "No bio added yet."}</p>
          </div>
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <button className={styles.editBtn} onClick={handleEdit}>
            ✏️ Edit Profile
          </button>
          <button className={styles.logoutBtn} onClick={logout}>
            🚪 Logout
          </button>
        </div>
      </div>
    </div>
  );
}
