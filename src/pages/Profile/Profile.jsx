import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import styles from "./Profile.module.css";
import { useNavigate } from "react-router-dom";
import { useAuthActions } from "../../hooks/useAuth";
import VerifyEmailButton from "./VerifyEmailButton";
import { BiCheckCircle, BiLogOut, BiEdit } from "react-icons/bi";
import EditProfile from "./EditProfile";

export default function Profile() {
  const { userData, user, emailVerified } = useAuth();
  const navigate = useNavigate();
  const { logout } = useAuthActions();
  const [editMenu, setEditMenu] = useState(false);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) logout();
  };

  if (!userData) {
    return <p className="p-4 text-gray-500">Loading profile...</p>; // Skeleton loader suggestion
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {editMenu ? (
          <EditProfile onDone={() => setEditMenu(false)} />
        ) : (
          <>
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
                <p>
                  {userData?.email}
                  {emailVerified && (
                    <BiCheckCircle
                      className="text-green-500 inline w-7 h-7 ml-1"
                      title="Email Verified"
                    />
                  )}
                </p>
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
              {!emailVerified && <VerifyEmailButton />}
              <button
                className={styles.editBtn}
                onClick={() => setEditMenu(true)}
              >
                <BiEdit className="inline mr-1" /> Edit Profile
              </button>
              <button className={styles.logoutBtn} onClick={handleLogout}>
                <BiLogOut className="inline mr-1" /> Logout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
