import React from 'react';
import styles from './StatusBadge.module.css';

export default function StatusBadge({ status }) {
  const getStatusConfig = (status) => {
    switch (status) {
      case 'open':
        return {
          label: 'Open',
          className: styles.open
        };
      case 'assigned':
        return {
          label: 'Assigned',
          className: styles.assigned
        };
      case 'submitted':
        return {
          label: 'Submitted',
          className: styles.submitted
        };
      case 'completed':
        return {
          label: 'Completed',
          className: styles.completed
        };
      default:
        return {
          label: status,
          className: styles.default
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <span className={`${styles.badge} ${config.className}`}>
      {config.label}
    </span>
  );
} 