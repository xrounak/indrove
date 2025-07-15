import React from 'react';
import EmptyState from '../../../pages/Hire/1Dashboard/EmptyState/EmptyState';
import styles from './ApplicantList.module.css';

export default function ApplicantList({ applications, users, onAssign }) {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? styles.star : styles.starEmpty}>
          ★
        </span>
      );
    }
    return stars;
  };

  // Check if applications array is empty or undefined
  const hasApplications = applications && applications.length > 0;

  if (!hasApplications) {
    return (
      <div className={styles.container}>
        <h3 className={styles.sectionTitle}>Applicants (0)</h3>
        <EmptyState
          icon="👥"
          title="No Applicants Yet"
          description="This task hasn't received any applications yet. Consider adjusting the budget or deadline to attract more freelancers."
          variant="applicants"
        />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.sectionTitle}>Applicants ({applications.length})</h3>
      
      <div className={styles.applicantsList}>
        {applications.map((application) => {
          const applicant = users[application.freelancerId];
          
          return (
            <div key={application.id} className={styles.applicantCard}>
              <div className={styles.applicantInfo}>
                <div className={styles.applicantHeader}>
                  <div className={styles.applicantName}>
                    {applicant ? applicant.name : 'Unknown User'}
                  </div>
                  <div className={styles.rating}>
                    {renderStars(applicant?.rating || 0)}
                    <span className={styles.ratingText}>
                      ({applicant?.rating || 0})
                    </span>
                  </div>
                </div>
                
                <div className={styles.applicantDetails}>
                  <span className={styles.email}>
                    {applicant ? applicant.email : 'No email available'}
                  </span>
                  <span className={styles.experience}>
                    {applicant?.experience || 'No experience listed'}
                  </span>
                </div>
                
                {application.message && (
                  <div className={styles.applicationMessage}>
                    <strong>Message:</strong> {application.message}
                  </div>
                )}
              </div>
              
              <div className={styles.applicantActions}>
                <button 
                  className={styles.viewProfileBtn}
                  onClick={() => window.open(`/profile/${application.freelancerId}`, '_blank')}
                >
                  View Profile
                </button>
                <button 
                  className={styles.assignBtn}
                  onClick={() => onAssign(application.freelancerId)}
                >
                  Assign
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
} 