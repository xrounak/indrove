import styles from './Sidebar.module.css';

const navLinks = [
  { icon: '🏠', label: 'Dashboard', href: '#' },
  { icon: '➕', label: 'Post New Task', href: '#' },
  { icon: '✅', label: 'Completed Tasks', href: '#' },
  { icon: '⚙', label: 'Settings', href: '#' },
  { icon: '🚪', label: 'Logout', href: '#' },
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
                <a href={link.href} className={styles.navLink}>
                  <span className={styles.icon}>{link.icon}</span>
                  <span className={styles.label}>{link.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
} 
