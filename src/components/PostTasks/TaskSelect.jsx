import React from "react";
import styles from "./TaskSelect.module.css";

const TaskSelect = ({
  name,
  value,
  onChange,
  options = [],
  label,
  required = false,
  ...props
}) => {
  return (
    <div className={styles.selectGroup}>
      {label && (
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
      )}
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={styles.select}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TaskSelect; 