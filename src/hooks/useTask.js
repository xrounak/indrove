import { useState, useEffect } from "react";
import * as taskService from "../services/taskService";
import { useAuth } from "../context/AuthContext";

export const useTask = (uid) => {
  const { loading, setLoading,user } = useAuth();
  const [taskLoading, setTaskLoading] = useState(false); // Local loading for task-specific operations
  const [tasks, setTasks] = useState([]);
  const [appliedTasks, setAppliedTasks] = useState([]);
  const [assignedTasks, setAssignedTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [applications, setApplications] = useState([]);
  const [users, setUsers] = useState({});
  const [error, setError] = useState(null);

  const [stats, setStats] = useState({
    open: 0,
    inProgress: 0,
    completed: 0,
    totalSpent: 0,
  });

  // Auto-fetch stats and client tasks when UID changes
  useEffect(() => {
    if (uid) {
      loadClientTasks(uid);
      loadStats(uid);
      loadAppliedTasks();
      loadAssignedTasks();
    }
  }, [uid]);

  // ───────────────────────────────
  // 📦 CLIENT-SIDE FUNCTIONS
  // ───────────────────────────────

  const loadClientTasks = async (uid) => {
    setLoading(true);
    try {
      const data = await taskService.getClientTasks(uid);
      setTasks(data);
    } catch (err) {
      console.error("Failed to load tasks:", err);
      setError(err);
    }
    setLoading(false);
  };

  const loadStats = async (uid) => {
    setLoading(true);
    try {
      const data = await taskService.fetchTaskStatsByUser(uid);
      setStats(data);
    } catch (err) {
      console.error("Failed to load stats:", err);
      setError(err);
    }
    setLoading(false);
  };

  const postTask = async (taskData) => {
    setLoading(true);
    try {
      await taskService.createTask(taskData);
      await loadClientTasks(uid);
      await loadStats(uid);
    } catch (err) {
      console.error("Failed to post task:", err);
      setError(err);
    }
    setLoading(false);
  };

  const updateTask = async (taskId, updatedData) => {
    setLoading(true);
    try {
      await taskService.updateTask(taskId, updatedData);
      await loadClientTasks(uid);
      await loadStats(uid);
    } catch (err) {
      console.error("Failed to update task:", err);
      setError(err);
    }
    setLoading(false);
  };

  const deleteTask = async (taskId) => {
    console.log("Deleting task of id:", taskId);
    setLoading(true);
    try {
      await taskService.deleteTask(taskId);
      await loadClientTasks(uid);
      await loadStats(uid);
    } catch (err) {
      console.error("Failed to delete task:", err);
      setError(err);
    }
    setLoading(false);
  };

  const assignTask = async (taskId, freelancerId) => {
    const updated = {
      assignedTo: freelancerId,
      assignedAt: new Date(),
      status: "assigned",
    };
    await updateTask(taskId, updated);
    setSelectedTask((prev) => ({ ...prev, ...updated }));
  };

  const completeTask = async (taskId) => {
    const updated = {
      status: "completed",
      completedAt: new Date(),
    };
    await updateTask(taskId, updated);
    setSelectedTask((prev) => ({ ...prev, ...updated }));
  };

  const submitFeedback = async (taskId, rating, message) => {
    const review = {
      rating,
      message,
      submittedAt: new Date(),
    };
    await updateTask(taskId, { review });
    setSelectedTask((prev) => ({ ...prev, review }));
  };

const loadApplicants = async (task) => {
  if (!task || !task.applicant || task.applicant.length === 0) return;

  // try {
  //   const userDocs = await Promise.all(
  //     task.applicant.map((uid) => taskService.getUserById(uid))
  //   );

  //   const userMap = {};
  //   userDocs.forEach((user, idx) => {
  //     userMap[task.applicant[idx]] = user;
  //   });

    setApplications(task.applicant); // this is an array of UID strings
    // setUsers(userMap);
  // } catch (err) {
  //   console.error("Failed to load applicants:", err);
  //   setError(err);
  // }
};


  // ───────────────────────────────
  // 👩‍💻 FREELANCER-SIDE FUNCTIONS
  // ───────────────────────────────

  const loadAppliedTasks = async () => {
    try {
      const data = await taskService.getAppliedTasks(uid);
      setAppliedTasks(data);
    } catch (err) {
      console.error("Failed to load applied tasks:", err);
      setError(err);
    }
  };

  const loadAssignedTasks = async () => {
    try {
      const data = await taskService.getAssignedTasks(uid);
      setAssignedTasks(data);
    } catch (err) {
      console.error("Failed to load assigned tasks:", err);
      setError(err);
    }
  };

  const applyToTask = async (taskId) => {
    setTaskLoading(true);
    try {
      await taskService.applyToTask(taskId,user.uid);
      await loadAppliedTasks();
    } catch (err) {
      console.error("Failed to apply:", err);
      setError(err);
    }
    setTaskLoading(false);
  };

  const submitWork = async (taskId, submissionData) => {
    setTaskLoading(true);
    try {
      await taskService.submitTaskWork(taskId, submissionData);
      await loadAssignedTasks();
    } catch (err) {
      console.error("Failed to submit work:", err);
      setError(err);
    }
    setTaskLoading(false);
  };

  // ───────────────────────────────
  // 🌐 SHARED FUNCTIONS
  // ───────────────────────────────

  const getAllTask = async () => {
    setTaskLoading(true);
    try {
      const data = await taskService.fetchAllTasks();
      setTasks(data);
    } catch (err) {
      console.error("Failed to fetch all tasks:", err);
      setError(err);
    }
    setTaskLoading(false);
  };

  const viewTask = async (taskId) => {
    setLoading(true);
    try {
      const task = await taskService.getTaskById(taskId);
      console.log(task);
      setSelectedTask(task);
      await loadApplicants(task);
    } catch (err) {
      console.error("Failed to fetch task:", err);
      setError(err);
    }
    setLoading(false);
  };

  const closeTaskModal = () => {
    setSelectedTask(null);
  };

  // ───────────────────────────────
  // ✅ EXPORT
  // ───────────────────────────────

  return {
    loading: taskLoading,
    error,
    tasks,
    stats,
    selectedTask,
    applicant: applications,
    users,
    appliedTasks,
    assignedTasks,
    postTask,
    updateTask,
    deleteTask,
    loadClientTasks,
    viewTask,
    closeTaskModal,
    assignTask,
    completeTask,
    submitFeedback,
    setLoading,
    getAllTask,
    applyToTask,
    submitWork,
    reloadAppliedTasks: loadAppliedTasks,
    reloadAssignedTasks: loadAssignedTasks,
    
  };
};
