import React, { useState } from 'react';
import TimelineStatus from './TimelineStatus/TimelineStatus';
import StatusBadge from './StatusBadge/StatusBadge';
import ApplicantList from './ApplicantList/ApplicantList';
import SubmissionViewer from './SubmissionViewer/SubmissionViewer';
import FeedbackForm from './FeedbackForm/FeedbackForm';
import TaskInfoBlock from './TaskInfoBlock/TaskInfoBlock';
import OwnershipInfo from './OwnershipInfo/OwnershipInfo';
import styles from './TaskDetailModal.module.css';

export default function TaskDetailModal({ task, users = {}, applications = [], onClose, onAssign, onComplete, onDownload, onFeedback }) {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState({
    timeline: false,
    applicants: false,
    submission: false,
    feedback: false
  });

  const toggleSection = (section) => {
    setCollapsedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleAssign = (freelancerId) => {
    if (onAssign) {
      onAssign(task.id, freelancerId);
    }
  };

  const handleComplete = () => {
    if (onComplete) {
      onComplete(task.id);
    }
  };

  const handleDownload = () => {
    if (onDownload) {
      onDownload(task.id);
    }
  };

  const handleFeedback = (rating, message) => {
    if (onFeedback) {
      onFeedback(task.id, rating, message);
      setShowFeedbackForm(false);
    }
  };

  const CollapsibleSection = ({ title, children, sectionKey, defaultCollapsed = false }) => {
    const isCollapsed = collapsedSections[sectionKey] ?? defaultCollapsed;
    
    return (
      <div className={styles.collapsibleSection}>
        <button 
          className={styles.sectionHeader}
          onClick={() => toggleSection(sectionKey)}
        >
          <span className={styles.sectionTitle}>{title}</span>
          <span className={`${styles.collapseIcon} ${isCollapsed ? styles.collapsed : ''}`}>
            ▼
          </span>
        </button>
        <div className={`${styles.sectionContent} ${isCollapsed ? styles.collapsed : ''}`}>
          {children}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <h2 className={styles.title}>{task.title}</h2>
            <StatusBadge status={task.status} />
            <span className={styles.category}>{task.category}</span>
          </div>
          <button className={styles.closeBtn} onClick={onClose}>
            ✕
          </button>
        </div>

        <div className={styles.content}>
          {/* Task Info Block - Always visible */}
          <TaskInfoBlock task={task} />

          {/* Ownership Info - Always visible */}
          <OwnershipInfo 
            task={task} 
            users={users}
            assignedUser={users[task.assignedTo]}
          />

          {/* Timeline Section - Collapsible */}
          <CollapsibleSection title="Timeline" sectionKey="timeline">
            <TimelineStatus task={task} />
          </CollapsibleSection>

          {/* Applicants List - Collapsible */}
          {task.status === 'open' && (
            <CollapsibleSection 
              title={`Applicants (${applications.length})`} 
              sectionKey="applicants"
              defaultCollapsed={true}
            >
              <ApplicantList 
                applications={applications}
                users={users}
                onAssign={handleAssign}
              />
            </CollapsibleSection>
          )}

          {/* Submissions - Collapsible */}
          {(task.status === 'submitted' || task.status === 'completed') && task.submission && (
            <CollapsibleSection 
              title="Submission" 
              sectionKey="submission"
              defaultCollapsed={true}
            >
              <SubmissionViewer 
                submission={task.submission}
                onDownload={handleDownload}
              />
            </CollapsibleSection>
          )}

          {/* Feedback Form - Collapsible */}
          {task.status === 'completed' && !task.review && (
            <CollapsibleSection 
              title="Feedback" 
              sectionKey="feedback"
              defaultCollapsed={true}
            >
              <div className={styles.feedbackSection}>
                {!showFeedbackForm ? (
                  <button 
                    className={styles.feedbackBtn}
                    onClick={() => setShowFeedbackForm(true)}
                  >
                    Give Feedback
                  </button>
                ) : (
                  <FeedbackForm 
                    onSubmit={handleFeedback}
                    onCancel={() => setShowFeedbackForm(false)}
                  />
                )}
              </div>
            </CollapsibleSection>
          )}
        </div>

        {/* Action Buttons */}
        <div className={styles.actions}>
          {task.status === 'open' && applications.length > 0 && (
            <button className={styles.assignBtn} disabled>
              Assign Freelancer
            </button>
          )}
          
          {task.status === 'submitted' && (
            <button className={styles.completeBtn} onClick={handleComplete}>
              Mark as Completed
            </button>
          )}
          
          {(task.status === 'submitted' || task.status === 'completed') && task.submission && (
            <button className={styles.downloadBtn} onClick={handleDownload}>
              Download Submission
            </button>
          )}
        </div>
      </div>
    </div>
  );
} 