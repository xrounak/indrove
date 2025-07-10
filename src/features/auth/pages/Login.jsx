import { useState } from "react";
import styles from "./Auth.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { getUserData } from "../../../services/authService";
import { useAuthActions } from "../../../hooks/useAuth";
import { useUILoading } from "../../../context/UILoadingContext ";


export default function Login({ onFlip }) {

  const {loginWithEmailAndPassword} = useAuthActions();
  const { startLoading, stopLoading } = useUILoading();
  const { setUser, setUserData } = useAuth(); // optionally if setUser is exposed
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErr("");

    try {
      const user = await loginWithEmailAndPassword(email, password);
      console.log("✅ Logged in as:", user.email);

      // Optional: fetch and set user data if needed manually
      const data = await getUserData(user.uid);
      if (setUserData) setUserData(data); // in case context exposes it
      if (setUser) setUser(user);
      startLoading();

      navigate("/"); // ✅ go to dashboard/home
      stopLoading();
    } catch (error) {
      console.error("❌ Login error:", error);
      setErr(error.message || "Login failed");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleLogin}>
      <h2 className={styles.title}>Login</h2>

      {err && <p className={styles.error}>{err}</p>}

      <input
        className={styles.input}
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        autoComplete="email"
      />

      <input
        className={styles.input}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        autoComplete="current-password"
      />

      <button type="submit" className={styles.actionBtn}>
        Login
      </button>

      <p className={styles.textSwitch}>
        Don&apos;t have an account? <span onClick={onFlip}>Register</span>
      </p>
    </form>
  );
}
