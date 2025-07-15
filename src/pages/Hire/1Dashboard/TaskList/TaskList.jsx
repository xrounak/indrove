// src/pages/Dashboard/components/TaskList/TaskList.jsx

import { useEffect, useState } from "react";
import { useTask } from "../../../../hooks/useTask";
import { useAuth } from "../../../../context/AuthContext";

import TaskCard from "./TaskCard/TaskCard";
import EmptyState from "../EmptyState/EmptyState";
import { TaskDetailModal } from "../../../../components/TaskDetailModal";
import PostTaskForm from "../../../../components/PostTasks/PostTaskForm";

import styles from "./TaskList.module.css";

export default function TaskList() {
  const { user } = useAuth();
  const {
    tasks,
    loading,
    error,
    selectedTask,
    users,
    applications,
    viewTask,
    closeTaskModal,
    assignTask,
    completeTask,
    submitFeedback,
    deleteTask,
    loadClientTasks,
  } = useTask(user?.uid);

  const [showPostTask, setShowPostTask] = useState(false);
  const [updatetask, setupdatetask] = useState(null);
  const handleclose = () => setShowPostTask(false);

  const onupdatetask = (task) => {
    setShowPostTask(true);
    setupdatetask(task);
  };

  // Load tasks on user load
  useEffect(() => {
    if (user?.uid) loadClientTasks(user.uid);
  }, [user]);

  const handlePostTask = () => {
    setShowPostTask(true);
    console.log("Redirecting to /post-task");
    // Example: useNavigate()('/post-task');
  };

  // Render: Loading
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

  // Render: Error
  if (error) {
    return (
      <div className={styles.taskList}>
        <div className={styles.error}>
          <h3>Error Loading Tasks</h3>
          <p>{error.message || "Something went wrong."}</p>
          <button onClick={() => loadClientTasks(user?.uid)}>Retry</button>
        </div>
      </div>
    );
  }

  // Render: Empty
  if (!tasks || tasks.length === 0) {
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

  // Render: Modal
  if (selectedTask) {
    return (
      <TaskDetailModal
        task={selectedTask}
        users={users}
        applications={applications}
        onClose={closeTaskModal}
        onAssign={assignTask}
        onComplete={completeTask}
        onDownload={(id) => console.log("Download files for:", id)}
        onFeedback={submitFeedback}
      />
    );
  }

  // Render: Task List
  return (
    <>
      {showPostTask ? (
        <PostTaskForm
          className={styles.postpopup}
          onClose={handleclose}
          updatingTask={updatetask}
        />
      ) : (
        <div className={styles.taskList}>
          {tasks.map((task) => (
            <div key={task.id}>
              <TaskCard
                task={task}
                onView={() => viewTask(task.id)}
                onDelete={() => deleteTask(task.id)}
                onUpdate={() => onupdatetask(task)}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
