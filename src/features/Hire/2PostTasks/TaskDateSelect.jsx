import React, { useState, useRef, useEffect } from "react";
import styles from "./TaskDateSelect.module.css";

const TaskDateSelect = ({
  name,
  value,
  onChange,
  label,
  required = false,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(value || "");
  const dropdownRef = useRef(null);

  // Generate date options for the next 30 days
  const generateDateOptions = () => {
    const options = [];
    const today = new Date();
    
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      const formattedDate = date.toISOString().split('T')[0];
      const displayDate = date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      });
      
      options.push({
        value: formattedDate,
        label: displayDate
      });
    }
    
    return options;
  };

  const dateOptions = generateDateOptions();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (dateValue) => {
    setSelectedDate(dateValue);
    onChange({ target: { name, value: dateValue } });
    setIsOpen(false);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const getDisplayValue = () => {
    if (!selectedDate) return "Choose deadline";
    const date = new Date(selectedDate);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className={styles.selectGroup}>
      {label && (
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
      )}
      <div className={styles.selectContainer} ref={dropdownRef}>
        <div
          className={`${styles.select} ${isOpen ? styles.selectOpen : ''}`}
          onClick={handleToggle}
        >
          <span className={styles.selectValue}>{getDisplayValue()}</span>
          <div className={styles.selectArrow}>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 4.5L6 7.5L9 4.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        
        {isOpen && (
          <div className={styles.dropdown}>
            {dateOptions.map((option) => (
              <div
                key={option.value}
                className={`${styles.option} ${
                  selectedDate === option.value ? styles.optionSelected : ''
                }`}
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskDateSelect; 