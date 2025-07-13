// Navbar.jsx
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import logo from "../../../assets/images/indorve-logo.png";
import { useAuth } from "../../../context/AuthContext";
import { useAuthActions } from "../../../hooks/useAuth";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const { user, userData } = useAuth();
  const { logout } = useAuthActions();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className={styles.navbar}>
      {/* Left - Hamburger */}
      <div className={styles.left}>
        <button
          className={`${styles.hamburger} ${menuOpen ? styles.hamburgerActive : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle mobile menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Center - Logo */}
      <div className={styles.center} onClick={() => navigate("/")} role="button" tabIndex={0}>
        <div className={styles.logoGroup}>
          <img src={logo} className={styles.logo} alt="Indorve Logo" />
        </div>
      </div>

      {/* Right - Auth/Profile */}
      <div
        className={styles.right}
        onClick={() => navigate(user ? "/profile" : "/auth")}
        role="button"
        tabIndex={0}
      >
        {user ? (
          <>
                      <span className={styles.userName}>
              {userData?.name || user.displayName || "User"}
            </span>
            {user.photoURL && (
              <img src={user.photoURL} alt="Profile" className={styles.profilePic} />
            )}

          </>
        ) : (
          <>
          
            <span className={styles.userName}>Login</span>
            <img
              src="https://i.pravatar.cc/40"
              alt="Guest"
              className={styles.profilePic}
            />
          </>
        )}
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.active : ""}`}>
        <NavLink to="/about" onClick={closeMenu} className={styles.mobileLink}>About</NavLink>
        <NavLink to="/hireroutes/post-task" onClick={closeMenu} className={styles.mobileLink}>Post Task</NavLink>
        <NavLink to="/earn" onClick={closeMenu} className={styles.mobileLink}>Earn</NavLink>
      </div>
    </nav>
  );
}
