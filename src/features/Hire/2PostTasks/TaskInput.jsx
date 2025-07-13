import React from "react";
import styles from "./TaskInput.module.css";

const TaskInput = ({
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  label,
  ...props
}) => {
  return (
    <div className={styles.inputGroup}>
      {label && (
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={styles.input}
        {...props}
      />
    </div>
  );
};

export default TaskInput; 