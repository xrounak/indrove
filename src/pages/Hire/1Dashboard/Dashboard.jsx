import React, { useState } from "react";
import DashboardHeaderCards from "./DashboardHeaderCards/DashboardHeaderCards";
import TaskList from "./TaskList/TaskList";
import RecentActivity from "./RecentActivity/RecentActivity";
import { AuthProvider } from "../../../context/AuthContext";
import styles from "./Dashboard.module.css";
import PostTaskForm from "../../../components/PostTasks/PostTaskForm";
import Carousel from "./Carousel/Carousel";

export default function Dashboard() {
  const [showPostTask, setShowPostTask] = useState(false);
  const handleclose = () => setShowPostTask(false);

  return (
    <AuthProvider>
      <div className={styles.dashboardRoot}>
        <div className={styles.dashboardBody}>
          <main className={styles.dashboardMain}>
            <DashboardHeaderCards />
            <div className={styles.carousel}>
              <div className={styles.taskButtonContainer}>
                <button
                  onClick={() => setShowPostTask((prev) => !prev)}
                  className={styles.postTaskButton}
                >
                  {"Post New Task"}
                </button>
              </div>

              <Carousel></Carousel>
            </div>

            {showPostTask && (
              <PostTaskForm
                className={styles.postpopup}
                onClose={handleclose}
              />
            )}

            <div className={styles.dashboardContentGrid}>
              <section className={styles.taskListSection}>
                <TaskList />
              </section>
              {/* <aside className={styles.recentActivityAside}>
                <RecentActivity />
              </aside> */}
            </div>
          </main>
        </div>
      </div>
    </AuthProvider>
  );
}
