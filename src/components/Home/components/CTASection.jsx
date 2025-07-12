import React from "react";
import styles from "./CTASection.module.css";
import { useNavigate } from "react-router-dom";

export default function CTASection() {
  const navigate = useNavigate();
  return (
    <section className={styles.ctaSection}>
      <h2 className={styles.heading}>Ready to get started?</h2>
      <div className={styles.ctaGroup}>
        <button className={styles.ctaBtnPrimary} onClick={()=> navigate("/HireRoutes")}>Post a Task</button>
        <button className={styles.ctaBtnSecondary} onClick={()=> navigate("/WorkRoutes")}>Start Earning</button>
      </div>
    </section>
  );
} 