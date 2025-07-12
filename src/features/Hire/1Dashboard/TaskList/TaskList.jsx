import TaskCard from './TaskCard/TaskCard';
import styles from './TaskList.module.css';

const tasks = [
  {
    id: 1,
    title: 'Design Landing Page',
    deadline: '2024-07-10',
    budget: 300,
    status: 'Open',
    applications: 4,
  },
  {
    id: 2,
    title: 'Write Blog Article',
    deadline: '2024-07-12',
    budget: 120,
    status: 'Assigned',
    applications: 2,
  },
  {
    id: 3,
    title: 'SEO Audit',
    deadline: '2024-07-15',
    budget: 200,
    status: 'Completed',
    applications: 5,
  },
  {
    id: 4,
    title: 'Mobile App Testing',
    deadline: '2024-07-18',
    budget: 180,
    status: 'Open',
    applications: 3,
  },
  {
    id: 5,
    title: 'Logo Redesign',
    deadline: '2024-07-20',
    budget: 250,
    status: 'Assigned',
    applications: 6,
  },
  {
    id: 6,
    title: 'Data Entry for Survey',
    deadline: '2024-07-22',
    budget: 90,
    status: 'Completed',
    applications: 1,
  },
  {
    id: 7,
    title: 'Social Media Campaign',
    deadline: '2024-07-25',
    budget: 400,
    status: 'Open',
    applications: 5,
  },
  {
    id: 8,
    title: 'Proofread Research Paper',
    deadline: '2024-07-28',
    budget: 75,
    status: 'Assigned',
    applications: 2,
  },
  {
    id: 9,
    title: 'Video Editing for Promo',
    deadline: '2024-07-30',
    budget: 350,
    status: 'Completed',
    applications: 4,
  },
];

export default function TaskList() {
  return (
    <div className={styles.taskList}>
      {tasks.map(task => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
} 