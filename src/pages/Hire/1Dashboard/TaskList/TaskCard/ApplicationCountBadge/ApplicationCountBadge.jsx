import styles from './ApplicationCountBadge.module.css';

export default function ApplicationCountBadge({ count }) {
  return (
    <span className={styles.badge}>{count} applicants</span>
  );
} 