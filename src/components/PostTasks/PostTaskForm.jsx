import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import styles from "./PostTaskForm.module.css";
import TaskInput from "./TaskInput";
import TaskTextarea from "./TaskTextarea";
import TaskSelect from "./TaskSelect";
import TaskDateSelect from "./TaskDateSelect";
import TaskButton from "./TaskButton";
import { serverTimestamp } from "firebase/firestore";
// 🔁 These imports assume your hooks/services are set up like before:
import { useAuth } from "../../context/AuthContext";
import { useTask } from "../../hooks/useTask";

export default function PostTaskForm({ onClose, updatingTask = null }) {
  const { user } = useAuth();
  const { postTask, updateTask, loadClientTasks ,loading,setLoading } = useTask();


  const [form, setForm] = useState({
    title: "",
    description: "",
    deadline: "",
    budget: "",
    category: "",
  });

  // Pre-fill form if editing a task
  useEffect(() => {
    if (updatingTask) {
      setForm({
        title: updatingTask.title || "",
        description: updatingTask.description || "",
        deadline: updatingTask.deadline || "",
        budget: updatingTask.budget || "",
        category: updatingTask.category || "",
        createdAt: serverTimestamp()
      });
    }
  }, [updatingTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple form validation
    if (!form.title || !form.description || !form.deadline) {
      return toast.error("Please fill in all required fields.");
    }

    setLoading(true);
    try {
      if (updatingTask?.id) {
        await updateTask(updatingTask.id, form);
        toast.success("Task updated successfully!");
      } else {
        await postTask({
          ...form,
          postedBy: user.uid,
        });
        toast.success("Task posted successfully!");
      }

      // Reset form and close modal
      setForm({
        title: "",
        description: "",
        deadline: "",
        budget: "",
        category: "",
      });
      
      await loadClientTasks(user.uid);
      onClose();
    } catch (error) {
      console.error("Error submitting task:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <div className={styles.formWrapper}>
          <div className={styles.header}>
            <button type="button" onClick={onClose} className={styles.closeBtn}>
              ✖
            </button>
            <h1 className={styles.title}>
              {updatingTask ? "Update Task" : "Post a New Task"}
            </h1>
            <p className={styles.subtitle}>
              {updatingTask
                ? "Modify the task details below"
                : "Describe your task and find the perfect freelancer"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGrid}>
              <TaskInput
                name="title"
                label="Task Title"
                placeholder="Enter title"
                value={form.title}
                onChange={handleChange}
                required
              />

              <TaskTextarea
                name="description"
                label="Task Description"
                placeholder="Describe your task..."
                value={form.description}
                onChange={handleChange}
                required
              />

              <TaskDateSelect
                name="deadline"
                label="Deadline"
                value={form.deadline}
                onChange={handleChange}
                required
              />

              <TaskInput
                name="budget"
                type="number"
                label="Budget (₹)"
                placeholder="Enter budget"
                value={form.budget}
                onChange={handleChange}
              />

              <TaskSelect
                name="category"
                label="Category"
                value={form.category}
                onChange={handleChange}
                options={[
                  { value: "", label: "Choose category" },
                  { value: "Assignment", label: "Assignment" },
                  { value: "PPT", label: "PPT" },
                  { value: "Research", label: "Research" },
                  { value: "Writing", label: "Writing" },
                  { value: "Design", label: "Design" },
                  { value: "Programming", label: "Programming" },
                  { value: "Other", label: "Other" },
                ]}
              />
            </div>

            <div className={styles.buttonContainer}>
              <TaskButton
                type="submit"
                disabled={loading}
                loading={loading}
                className={styles.submitButton}
              >
                {loading
                  ? updatingTask
                    ? "Updating..."
                    : "Posting..."
                  : updatingTask
                    ? "Update Task"
                    : "Post Task"}
              </TaskButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
