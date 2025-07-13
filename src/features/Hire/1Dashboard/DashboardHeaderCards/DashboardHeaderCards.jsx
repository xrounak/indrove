import EmptyState from '../EmptyState/EmptyState';
import styles from './DashboardHeaderCards.module.css';

// Mock data - in real app this would come from props or context
const cards = [
  { label: 'Open Tasks', value: 3, color: styles.open },
  { label: 'In Progress', value: 2, color: styles.inProgress },
  { label: 'Completed', value: 7, color: styles.completed },
  { label: 'Budget Spent', value: '$1,200', color: styles.budget },
];

export default function DashboardHeaderCards({ cardsData = cards }) {
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
        <div key={idx} className={`${styles.card} ${card.color}`} tabIndex={0} role="button">
          <div className={styles.value}>{card.value}</div>
          <div className={styles.label}>{card.label}</div>
        </div>
      ))}
    </div>
  );
} 