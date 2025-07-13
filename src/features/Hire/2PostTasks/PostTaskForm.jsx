import React, { useState } from "react";
import { useTask } from "../../../hooks/useTask";
import { useAuth } from "../../../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import styles from "./PostTaskForm.module.css";
import TaskInput from "./TaskInput";
import TaskTextarea from "./TaskTextarea";
import TaskSelect from "./TaskSelect";
import TaskDateSelect from "./TaskDateSelect";
import TaskButton from "./TaskButton";

export default function PostTaskForm() {

  const {user} = useAuth();
  const loading = false;
  const {postTask} = useTask();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    deadline: "",
    budget: "",
    category: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.deadline) {
      return toast.error("All fields are required");
    }

    await postTask({
      ...form,
      postedBy: user.uid,
    });

    toast.success("Task posted!");
    navigate("/client/dashboard");
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <div className={styles.header}>
          <h2><button type="button" onClick={()=>navigate("/HireRoutes")}>X</button></h2>
          <h1 className={styles.title}>Post a New Task</h1>
          <p className={styles.subtitle}>
            Describe your task and find the perfect freelancer to help you
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGrid}>
            <TaskInput
              name="title"
              placeholder="Task Title"
              value={form.title}
              onChange={handleChange}
              required
              label="Task Title"
            />

            <TaskTextarea
              name="description"
              placeholder="Describe your task in detail..."
              value={form.description}
              onChange={handleChange}
              required
              label="Task Description"
            />

            <TaskDateSelect
              name="deadline"
              value={form.deadline}
              onChange={handleChange}
              required
              label="Deadline"
            />

            <TaskInput
              name="budget"
              type="number"
              placeholder="₹ Budget"
              value={form.budget}
              onChange={handleChange}
              label="Budget (₹)"
            />

            <TaskSelect
              name="category"
              value={form.category}
              onChange={handleChange}
              label="Category"
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
              {loading ? "Posting Task..." : "Post Task"}
            </TaskButton>
          </div>
        </form>
      </div>
    </div>
  );
} 