import React from 'react';
import Navbar from './Navbar/Navbar';
import Sidebar from './Sidebar/Sidebar';
import DashboardHeaderCards from './DashboardHeaderCards/DashboardHeaderCards';
import TaskList from './TaskList/TaskList';
import RecentActivity from './RecentActivity/RecentActivity';
import { AuthProvider } from '../../../context/AuthContext';
import styles from './Dashboard.module.css';

export default function Dashboard() {
  return (
    <AuthProvider>
      <div className={styles.dashboardRoot}>
        <Navbar />
        <div className={styles.dashboardBody}>
          <Sidebar />
          <main className={styles.dashboardMain}>
            <DashboardHeaderCards />
            <div className={styles.dashboardContentGrid}>
              <section className={styles.taskListSection}>
                <TaskList />
              </section>
              <aside className={styles.recentActivityAside}>
                <RecentActivity />
              </aside>
            </div>
          </main>
        </div>
      </div>
    </AuthProvider>
  );
} 