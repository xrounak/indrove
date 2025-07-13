import React, { useState } from 'react';
import styles from './TaskInfoBlock.module.css';

export default function TaskInfoBlock({ task }) {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  
  // Shorter preview for mobile-friendly experience
  const maxLength = 60; // Reduced from 100 to 60 characters
  const shouldTruncate = task.description.length > maxLength;
  const truncatedText = task.description.substring(0, maxLength);
  
  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.sectionTitle}>Task Information</h3>
      
      <div className={styles.infoGrid}>
        <div className={styles.infoItem}>
          <div className={styles.icon}>📄</div>
          <div className={styles.content}>
            <label className={styles.label}>Description</label>
            <div className={styles.descriptionContainer}>
              <p className={styles.value}>
                {isDescriptionExpanded ? task.description : truncatedText}
                {shouldTruncate && !isDescriptionExpanded && (
                  <span className={styles.ellipsis}>...</span>
                )}
              </p>
              {shouldTruncate && (
                <button 
                  className={styles.expandBtn}
                  onClick={toggleDescription}
                >
                  {isDescriptionExpanded ? 'Show less' : 'more...'}
                </button>
              )}
            </div>
          </div>
        </div>

        <div className={styles.infoItem}>
          <div className={styles.icon}>🧮</div>
          <div className={styles.content}>
            <label className={styles.label}>Budget</label>
            <p className={styles.value}>₹{task.budget}</p>
          </div>
        </div>

        <div className={styles.infoItem}>
          <div className={styles.icon}>🗓</div>
          <div className={styles.content}>
            <label className={styles.label}>Deadline</label>
            <p className={styles.value}>{task.deadline}</p>
          </div>
        </div>
      </div>
    </div>
  );
} 