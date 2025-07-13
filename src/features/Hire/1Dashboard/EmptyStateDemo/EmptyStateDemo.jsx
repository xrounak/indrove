import React, { useState } from 'react';
import Dashboard from '../Dashboard';
import styles from './EmptyStateDemo.module.css';

export default function EmptyStateDemo() {
  const [demoMode, setDemoMode] = useState('all');

  const demoModes = {
    all: 'Show All Data',
    noTasks: 'No Tasks',
    noActivities: 'No Activities', 
    noStats: 'No Statistics',
    noApplicants: 'No Applicants',
    noSubmissions: 'No Submissions'
  };

  const renderDemoDashboard = () => {
    switch (demoMode) {
      case 'noTasks':
        return <Dashboard tasks={[]} activities={[]} stats={[]} />;
      case 'noActivities':
        return <Dashboard tasks={[]} activities={[]} stats={[]} />;
      case 'noStats':
        return <Dashboard tasks={[]} activities={[]} stats={[]} />;
      case 'noApplicants':
        return <Dashboard tasks={[]} activities={[]} stats={[]} />;
      case 'noSubmissions':
        return <Dashboard tasks={[]} activities={[]} stats={[]} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className={styles.demoContainer}>
      <div className={styles.demoControls}>
        <h2>Empty State Demo</h2>
        <p>Select a demo mode to see different empty states:</p>
        
        <div className={styles.demoButtons}>
          {Object.entries(demoModes).map(([key, label]) => (
            <button
              key={key}
              className={`${styles.demoButton} ${demoMode === key ? styles.active : ''}`}
              onClick={() => setDemoMode(key)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      
      <div className={styles.demoContent}>
        {renderDemoDashboard()}
      </div>
    </div>
  );
} 