// src/routes/TestBoard.jsx
import styles from "./TestBoard.module.css";

export const TestBoard = ({ user, userData, onClick, vistauth }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Welcome to Indorve</h1>

      {user ? (
        <div className={styles.profileCard}>
          <img
            src={user.photoURL || "https://multiavatar.com/16134ee2854c2083a6"}
            alt="Profile"
            className={styles.avatar}
          />

          <div className={styles.details}>
            <p><strong>Name:</strong> {user.displayName || userData?.name || "N/A"}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {userData?.role || "Unknown"}</p>
            <p><strong>UID:</strong> {user.uid}</p>
          </div>

          <button className={styles.logoutBtn} onClick={onClick}>
            Log Out
          </button>
        </div>
      ) : (
        <div className={styles.notLoggedIn}>
          <p>You are not logged in.</p>
          <button className={styles.getStartedBtn} onClick={vistauth}>
            Get Started
          </button>
        </div>
      )}
    </div>
  );
};
