import { useEffect, useState } from "react";
import { useTask } from "../../../../hooks/useTask";
import { useAuth } from "../../../../context/AuthContext";
import { getTaskById } from "../../../../services/taskService";

import TaskCard from "./TaskCard/TaskCard";
import EmptyState from "../EmptyState/EmptyState";
import { TaskDetailModal } from "../../../../components/TaskDetailModal";

import styles from "./TaskList.module.css";

export default function TaskList() {
  const { loadClientTasks, tasks, loading, error } = useTask();
  const { user } = useAuth();

  const [popupTask, setPopupTask] = useState(null);
  const [users, setUsers] = useState({});
  const [applications, setApplications] = useState([]);

  // Fetch tasks when user is available
  useEffect(() => {
    console.log(user);
    if (user?.uid) {
      loadClientTasks(user.uid);
    }
  }, [user]);

  // Handlers
const handleTaskClick = async (taskId) => {
  try {
    const task = await getTaskById(taskId);
    setPopupTask(task); // ✅ Set the full task object
  } catch (error) {
    console.error("Failed to fetch task:", error);
  }
};

  const handleCloseModal = () => setPopupTask(null);

  const handleAssign = (taskId, freelancerId) => {
    console.log("Assigning", taskId, "to", freelancerId);
    setPopupTask((prev) => ({
      ...prev,
      assignedTo: freelancerId,
      assignedAt: new Date(),
      status: "assigned",
    }));
  };

  const handleComplete = (taskId) => {
    console.log("Completing task", taskId);
    setPopupTask((prev) => ({
      ...prev,
      status: "completed",
      completedAt: new Date(),
    }));
  };

  const handleDownload = (taskId) => {
    console.log("Downloading files for task:", taskId);
  };

  const handleFeedback = (taskId, rating, message) => {
    console.log("Submitting feedback", taskId, rating, message);
    setPopupTask((prev) => ({
      ...prev,
      review: {
        rating,
        message,
        submittedAt: new Date(),
      },
    }));
  };

  const handlePostTask = () => {
    console.log("Redirecting to post-task page...");
    // Navigate to /post-task
  };

  // Loading state
  if (loading) {
    return (
      <div className={styles.taskList}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Loading tasks...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={styles.taskList}>
        <div className={styles.error}>
          <h3>Error Loading Tasks</h3>
          <p>{error.message || "Something went wrong."}</p>
          <button onClick={() => loadClientTasks(user?.id)}>Retry</button>
        </div>
      </div>
    );
  }

  // Empty state
  if (!tasks || tasks.length === 0) {
    console.log("no tasks avalible", tasks.length)
    return (
      <div className={styles.taskList}>
        <EmptyState
          icon="📋"
          title="No Tasks Available"
          description="You haven't posted any tasks yet. Start by creating your first task to find talented freelancers."
          actionText="Post Your First Task"
          onAction={handlePostTask}
          variant="tasks"
        />
      </div>
    );
  }

  // Task detail modal
  if (popupTask) {
    return (
      <TaskDetailModal
        task={popupTask}
        users={users}
        applications={applications}
        onClose={handleCloseModal}
        onAssign={handleAssign}
        onComplete={handleComplete}
        onDownload={handleDownload}
        onFeedback={handleFeedback}
      />
    );
  }

  // Task list view
  return (
    <div className={styles.taskList}>
      {tasks.map((task) => (
        <div key={task.id} onClick={() => handleTaskClick(task.id)}>
          <TaskCard task={task} handleTaskClick={handleTaskClick} />
        </div>
      ))}
    </div>
  );
}
