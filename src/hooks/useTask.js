// src/hooks/useTask.js
import { useState } from "react";
import * as taskService from "../services/taskService";

export const useTask = () => {
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  const loadClientTasks = async (uid) => {
    setLoading(true);
    try {
      const data = await taskService.getClientTasks(uid);
      setTasks(data);
      console.log("data is :",data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  const postTask = async (taskData) => {
    setLoading(true);
    try {
      await taskService.createTask(taskData);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  return { loading, tasks, error, loadClientTasks, postTask };
};