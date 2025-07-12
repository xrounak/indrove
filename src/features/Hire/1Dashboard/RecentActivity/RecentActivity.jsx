import styles from './RecentActivity.module.css';

const activities = [
  "You posted 'Physics PPT'",
  "Assigned Rahul to 'Essay Writing'",
  "Freelancer submitted file for 'Report Summary'",
];

export default function RecentActivity() {
  return (
    <div className={styles.activityBox}>
      <h4 className={styles.heading}>Recent Activity</h4>
      <ul className={styles.list}>
        {activities.map((activity, idx) => (
          <li key={idx} className={styles.item}>{activity}</li>
        ))}
      </ul>
    </div>
  );
} 