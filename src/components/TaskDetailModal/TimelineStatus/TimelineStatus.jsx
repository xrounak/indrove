import React from 'react';
import styles from './TimelineStatus.module.css';

export default function TimelineStatus({ task }) {
  const formatDate = (timestamp) => {
    if (!timestamp) return '-';
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const timelineSteps = [
    {
      stage: 'Created',
      timestamp: task.createdAt,
      completed: true,
      icon: '📝'
    },
    {
      stage: 'Assigned',
      timestamp: task.assignedAt,
      completed: !!task.assignedAt,
      icon: '👤'
    },
    {
      stage: 'Submitted',
      timestamp: task.submittedAt,
      completed: !!task.submittedAt,
      icon: '📤'
    },
    {
      stage: 'Completed',
      timestamp: task.completedAt,
      completed: !!task.completedAt,
      icon: '✅'
    }
  ];

  return (
    <div className={styles.container}>
      <h3 className={styles.sectionTitle}>Timeline</h3>
      
      <div className={styles.timeline}>
        {timelineSteps.map((step, index) => (
          <div key={step.stage} className={styles.timelineItem}>
            <div className={`${styles.timelineDot} ${step.completed ? styles.completed : styles.pending}`}>
              {step.completed ? '✅' : step.icon}
            </div>
            
            <div className={styles.timelineContent}>
              <div className={styles.stageInfo}>
                <span className={styles.stageName}>{step.stage}</span>
                <span className={styles.timestamp}>{formatDate(step.timestamp)}</span>
              </div>
            </div>
            
            {index < timelineSteps.length - 1 && (
              <div className={`${styles.timelineLine} ${step.completed ? styles.completed : styles.pending}`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 