// src/hooks/useTask.js
import { useState, useEffect } from "react";
import * as taskService from "../services/taskService";
import { useAuth } from "../context/AuthContext";

export const useTask = (uid) => {
  const { loading, setLoading } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    open: 0,
    inProgress: 0,
    completed: 0,
    totalSpent: 0,
  });
  const [selectedTask, setSelectedTask] = useState(null);
  const [applications, setApplications] = useState([]);
  const [users, setUsers] = useState({});

  // Auto-fetch stats when uid changes
  useEffect(() => {
    if (uid) {
      loadStats(uid);
    }
  }, [uid]);

  // Load all tasks for the client
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

  // Load stats
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

  // Create task
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
    setTasks(tasks);
  };

  // Update task
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

  // Delete task
  const deleteTask = async (taskId) => {
    console.log("deleating task of id : ", taskId);
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

  // View single task (and open modal)
  const viewTask = async (taskId) => {
    setLoading(true);
    try {
      const task = await taskService.getTaskById(taskId);
      setSelectedTask(task);
    } catch (err) {
      console.error("Failed to fetch task:", err);
      setError(err);
    }
    setLoading(false);
  };

  // Close modal
  const closeTaskModal = () => {
    setSelectedTask(null);
  };

  // Assign task
  const assignTask = async (taskId, freelancerId) => {
    const updated = {
      assignedTo: freelancerId,
      assignedAt: new Date(),
      status: "assigned",
    };
    await updateTask(taskId, updated);
    setSelectedTask((prev) => ({
      ...prev,
      ...updated,
    }));
  };

  // Mark complete
  const completeTask = async (taskId) => {
    const updated = {
      status: "completed",
      completedAt: new Date(),
    };
    await updateTask(taskId, updated);
    setSelectedTask((prev) => ({
      ...prev,
      ...updated,
    }));
  };

  // Submit feedback
  const submitFeedback = async (taskId, rating, message) => {
    const review = {
      rating,
      message,
      submittedAt: new Date(),
    };
    await updateTask(taskId, { review });
    setSelectedTask((prev) => ({
      ...prev,
      review,
    }));
  };

  return {
    loading,
    error,
    tasks,
    stats,
    selectedTask,
    applications,
    users,
    postTask,
    updateTask,
    deleteTask,
    loadClientTasks,
    viewTask,
    closeTaskModal,
    assignTask,
    completeTask,
    submitFeedback,
  };
};
