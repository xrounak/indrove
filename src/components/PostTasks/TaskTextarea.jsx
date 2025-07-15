import React from "react";
import styles from "./TaskTextarea.module.css";

const TaskTextarea = ({
  name,
  placeholder,
  value,
  onChange,
  required = false,
  label,
  rows = 4,
  ...props
}) => {
  return (
    <div className={styles.textareaGroup}>
      {label && (
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
      )}
      <textarea
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        rows={rows}
        className={styles.textarea}
        {...props}
      />
    </div>
  );
};

export default TaskTextarea; 