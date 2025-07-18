import React from "react";
import EmptyState from "../../../pages/Hire/1Dashboard/EmptyState/EmptyState";
import styles from "./ApplicantList.module.css";

export default function ApplicantList({ applicant, users, onAssign }) {
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

  const hasApplicant = applicant && applicant.length > 0;

  if (!hasApplicant) {
    return (
      <div className={styles.container}>
        <h3 className={styles.sectionTitle}>Applicants (0)</h3>
        <EmptyState
          icon="👥"
          title="No Applicants Yet"
          description="This task hasn't received any applicant yet. Consider adjusting the budget or deadline to attract more freelancers."
          variant="applicants"
        />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.sectionTitle}>Applicants ({applicant.length})</h3>

      <div className={styles.applicantsList}>
        {applicant.map((freelancerUid) => {
          const applicantUser = users[freelancerUid];

          return (
            <div key={freelancerUid} className={styles.applicantCard}>
              <div className={styles.applicantInfo}>
                <div className={styles.applicantHeader}>
                  <div className={styles.applicantName}>
                    {applicantUser?.name || "Unknown User"}
                  </div>
                  <div className={styles.rating}>
                    {renderStars(applicantUser?.rating || 0)}
                    <span className={styles.ratingText}>
                      ({applicantUser?.rating || 0})
                    </span>
                  </div>
                </div>

                <div className={styles.applicantDetails}>
                  <span className={styles.email}>
                    {applicantUser?.email || "No email"}
                  </span>
                  <span className={styles.experience}>
                    {applicantUser?.experience || "No experience listed"}
                  </span>
                </div>
              </div>

              <div className={styles.applicantActions}>
                <button
                  className={styles.viewProfileBtn}
                  onClick={() =>
                    window.open(`/profile/${freelancerUid}`, "_blank")
                  }
                >
                  View Profile
                </button>
                <button
                  className={styles.assignBtn}
                  onClick={() => onAssign(freelancerUid)}
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
