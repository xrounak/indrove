import React from 'react';
import styles from './EmptyState.module.css';

export default function EmptyState({ 
  icon, 
  title, 
  description, 
  actionText, 
  onAction, 
  variant = 'default' 
}) {
  return (
    <div className={`${styles.emptyState} ${styles[variant]}`}>
      <div className={styles.icon}>
        {icon}
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      {actionText && onAction && (
        <button className={styles.actionButton} onClick={onAction}>
          {actionText}
        </button>
      )}
    </div>
  );
} 