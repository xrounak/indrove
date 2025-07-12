import styles from './DashboardHeaderCards.module.css';

const cards = [
  { label: 'Open Tasks', value: 3, color: styles.open },
  { label: 'In Progress', value: 2, color: styles.inProgress },
  { label: 'Completed', value: 7, color: styles.completed },
  { label: 'Budget Spent', value: '$1,200', color: styles.budget },
];

export default function DashboardHeaderCards() {
  return (
    <div className={styles.cardsRow}>
      {cards.map((card, idx) => (
        <div key={idx} className={`${styles.card} ${card.color}`} tabIndex={0} role="button">
          <div className={styles.value}>{card.value}</div>
          <div className={styles.label}>{card.label}</div>
        </div>
      ))}
    </div>
  );
} 