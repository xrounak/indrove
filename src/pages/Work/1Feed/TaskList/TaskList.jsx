import { useEffect, useState } from "react";
import { Taskcard } from "./TaskCard";
import { useTask } from "../../../../hooks/useTask";
import { useAuth } from "../../../../context/AuthContext";

export const TaskList = () => {
  const {user} = useAuth();
  const { getAllTask, tasks, loading, applyToTask } = useTask();

  useEffect(() => {
    const fetchData = async () => {
        await getAllTask(); // This already manages loading & error inside
    };

    fetchData(); // Call the inner function
  }, []); // Run only once on mount

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-600 text-lg animate-pulse">Loading tasks...</div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500 text-lg">No tasks available</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-6">
      {tasks.map((task, index) => (
        <Taskcard 
        key={task.id || index}
        task={task}
        onApply={applyToTask}
         />
      ))}
    </div>
  );
};
