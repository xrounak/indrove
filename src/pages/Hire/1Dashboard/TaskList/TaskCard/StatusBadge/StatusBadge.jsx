import styles from './StatusBadge.module.css';

const statusColors = {
  Open: styles.open,
  Assigned: styles.assigned,
  Completed: styles.completed,
};

export default function StatusBadge({ status }) {
  return (
    <span className={`${styles.badge} ${statusColors[status] || ''}`}>{status}</span>
  );
} 