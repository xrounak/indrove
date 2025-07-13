import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTask } from '../../hooks/useTask';
import styles from './DashboardTest.module.css';

export default function DashboardTest() {
  const { user, loading: authLoading } = useAuth();
  const { tasks, loading: tasksLoading, error } = useTask();

  return (
    <div className={styles.testContainer}>
      <h2>Dashboard Test</h2>
      
      <div className={styles.testSection}>
        <h3>Authentication Status</h3>
        {authLoading ? (
          <p>Loading auth...</p>
        ) : user ? (
          <div>
            <p><strong>User:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
          </div>
        ) : (
          <p>No user logged in</p>
        )}
      </div>

      <div className={styles.testSection}>
        <h3>Tasks Status</h3>
        {tasksLoading ? (
          <p>Loading tasks...</p>
        ) : error ? (
          <p><strong>Error:</strong> {error}</p>
        ) : (
          <div>
            <p><strong>Tasks loaded:</strong> {tasks.length}</p>
            {tasks.map(task => (
              <div key={task.id} className={styles.taskItem}>
                <strong>{task.title}</strong> - {task.status}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={styles.testSection}>
        <h3>Instructions</h3>
        <ul>
          <li>Click on any task card to open the detail modal</li>
          <li>Use the empty state demo to test different scenarios</li>
          <li>Check the console for action logs</li>
        </ul>
      </div>
    </div>
  );
} 