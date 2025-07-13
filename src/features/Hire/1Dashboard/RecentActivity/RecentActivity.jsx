import EmptyState from '../EmptyState/EmptyState';
import styles from './RecentActivity.module.css';

// Mock data - in real app this would come from props or context
const activities = [
  "You posted 'Physics PPT'",
  "Assigned Rahul to 'Essay Writing'",
  "Freelancer submitted file for 'Report Summary'",
];

export default function RecentActivity({ activitiesData = activities }) {
  const hasActivities = activitiesData && activitiesData.length > 0;

  if (!hasActivities) {
    return (
      <div className={styles.activityBox}>
        <h4 className={styles.heading}>Recent Activity</h4>
        <EmptyState
          icon="📊"
          title="No Recent Activity"
          description="Your activity feed is empty. Start posting tasks and interacting with freelancers to see your activity here."
          variant="activity"
        />
      </div>
    );
  }

  return (
    <div className={styles.activityBox}>
      <h4 className={styles.heading}>Recent Activity</h4>
      <ul className={styles.list}>
        {activitiesData.map((activity, idx) => (
          <li key={idx} className={styles.item}>{activity}</li>
        ))}
      </ul>
    </div>
  );
} 