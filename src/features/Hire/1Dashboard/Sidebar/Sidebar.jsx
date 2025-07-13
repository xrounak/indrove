import { Link } from 'react-router-dom';
import styles from './Sidebar.module.css';

const navLinks = [
  { icon: '🏠', label: 'Dashboard', href: '/dashboard' },
  { icon: '➕', label: 'Post New Task', href: '/hireroutes/post-task' },
  { icon: '✅', label: 'Completed Tasks', href: '/completed-tasks' },
  { icon: '⚙', label: 'Settings', href: '/settings' },
  { icon: '🚪', label: 'Logout', href: '/logout' },
];

export default function Sidebar({ open = false, onClose }) {
  return (
    <>
      {/* Overlay for mobile/tablet */}
      <div
        className={open ? styles.overlay : styles.overlayHidden}
        onClick={onClose}
        aria-hidden={!open}
      />
      <aside className={open ? `${styles.sidebar} ${styles.sidebarOpen}` : styles.sidebar}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close sidebar">×</button>
        <nav>
          <ul className={styles.navList}>
            {navLinks.map((link, idx) => (
              <li key={idx} className={styles.navItem}>
                <Link to={link.href} className={styles.navLink} onClick={onClose}>
                  <span className={styles.icon}>{link.icon}</span>
                  <span className={styles.label}>{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
} 
