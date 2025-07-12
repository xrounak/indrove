import { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.leftGroup}>
          <button
            className={styles.hamburger}
            aria-label="Open sidebar"
            onClick={() => setSidebarOpen((v) => !v)}
          >
            <span className={sidebarOpen ? styles.hamburgerBarActive : styles.hamburgerBar}></span>
            <span className={sidebarOpen ? styles.hamburgerBarActive : styles.hamburgerBar}></span>
            <span className={sidebarOpen ? styles.hamburgerBarActive : styles.hamburgerBar}></span>
          </button>
          <span className={styles.logo}>Indorve</span>
        </div>
        <div className={styles.userGroup}>
          <span className={styles.userName}>Jane Doe</span>
          <img className={styles.avatar} src="https://i.pravatar.cc/40" alt="User Avatar" />
        </div>
      </nav>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
} 