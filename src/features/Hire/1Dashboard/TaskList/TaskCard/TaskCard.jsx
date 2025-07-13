import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge/StatusBadge';
import ApplicationCountBadge from './ApplicationCountBadge/ApplicationCountBadge';
import styles from './TaskCard.module.css';

export default function TaskCard({ task,handleTaskClick }) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>{task.title}</h3>
        <StatusBadge status={task.status} />
      </div>
      <div className={styles.details}>
        <span className={styles.detail}><strong>Deadline:</strong> {task.deadline}</span>
        <span className={styles.detail}><strong>Budget:</strong> ${task.budget}</span>
        <ApplicationCountBadge count={task.applications} />
      </div>
      <div className={styles.actions}>
        <Link onClick={handleTaskClick} className={styles.viewBtn}>View</Link>
      </div>
    </div>
  );
} 