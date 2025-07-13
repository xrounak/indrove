import React from 'react';
import styles from './OwnershipInfo.module.css';

export default function OwnershipInfo({ task, users, assignedUser }) {
  const postedByUser = users[task.postedBy];

  return (
    <div className={styles.container}>
      <h3 className={styles.sectionTitle}>Ownership Information</h3>
      
      <div className={styles.infoGrid}>
        <div className={styles.infoItem}>
          <div className={styles.icon}>👤</div>
          <div className={styles.content}>
            <label className={styles.label}>Posted by</label>
            <div className={styles.userInfo}>
              {postedByUser ? (
                <>
                  <span className={styles.userName}>{postedByUser.name}</span>
                  <span className={styles.userEmail}>{postedByUser.email}</span>
                </>
              ) : (
                <span className={styles.userName}>Unknown User</span>
              )}
            </div>
          </div>
        </div>

        <div className={styles.infoItem}>
          <div className={styles.icon}>🎯</div>
          <div className={styles.content}>
            <label className={styles.label}>Assigned to</label>
            <div className={styles.userInfo}>
              {assignedUser ? (
                <>
                  <span className={styles.userName}>{assignedUser.name}</span>
                  <span className={styles.userEmail}>{assignedUser.email}</span>
                </>
              ) : (
                <span className={styles.notAssigned}>Not assigned yet</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 