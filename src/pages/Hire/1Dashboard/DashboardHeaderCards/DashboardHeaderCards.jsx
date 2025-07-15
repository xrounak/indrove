import EmptyState from "../EmptyState/EmptyState";
import styles from "./DashboardHeaderCards.module.css";
import { useAuth } from "../../../../context/AuthContext";
import { useTask } from "../../../../hooks/useTask";

export default function DashboardHeaderCards() {
  const { user } = useAuth();
  const { stats } = useTask(user?.uid);
  const { open, inProgress, completed, totalSpent } = stats;

  const cardsData = [
    { label: "Open Tasks", value: open, color: styles.open },
    { label: "In Progress", value: inProgress, color: styles.inProgress },
    { label: "Completed", value: completed, color: styles.completed },
    { label: "Budget Spent", value: `$${totalSpent}`, color: styles.budget },
  ];

  const hasCards = cardsData && cardsData.length > 0;

  if (!hasCards) {
    return (
      <div className={styles.cardsRow}>
        <EmptyState
          icon="📊"
          title="No Statistics Available"
          description="Dashboard statistics will appear here once you start posting tasks and working with freelancers."
          variant="default"
        />
      </div>
    );
  }

  return (
    <div className={styles.cardsRow}>
      {cardsData.map((card, idx) => (
        <div
          key={idx}
          className={`${styles.card} ${card.color}`}
          tabIndex={0}
          role="button"
        >
          <div className={styles.value}>{card.value}</div>
          <div className={styles.label}>{card.label}</div>
        </div>
      ))}
    </div>
  );
}
