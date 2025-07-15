import React from "react";
import styles from "./TaskButton.module.css";

const TaskButton = ({
  children,
  type = "button",
  disabled = false,
  loading = false,
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`${styles.button} ${className}`}
      {...props}
    >
      {loading && (
        <div className={styles.loadingSpinner}>
          <svg
            className={styles.spinner}
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="31.416"
              strokeDashoffset="31.416"
            />
          </svg>
        </div>
      )}
      <span className={loading ? styles.hidden : ""}>{children}</span>
    </button>
  );
};

export default TaskButton; 