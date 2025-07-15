import React from "react";
import styles from "./Hero.module.css";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../../../context/AuthContext";

export default function Hero() {
  const navigate = useNavigate();

  const { userData } = useAuth();
  let route = "/hireroutes";
  if (userData?.role === "freelancer") {
    route = "/workroutes";
  }
  return (
    <section className={styles.hero}>
      <h1 className={styles.headline}>Get Things Done, Earn While You Learn</h1>
      <p className={styles.subtext}>
        Indorve connects clients and students for tasks, projects, and
        opportunities.
      </p>
      <div className={styles.ctaGroup}>
        <button
          className={styles.ctaBtnPrimary}
          onClick={() => navigate(route)}
        >
          Dashboard
        </button>
      </div>
    </section>
  );
}
