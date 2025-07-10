import { useState } from "react";
import styles from "./Auth.module.css";
import { useAuthActions } from "../../../hooks/useAuth";

export default function Register({ onFlip }) {
  const { registerWithEmailAndPassword } = useAuthActions();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setErr("");
    setSuccess("");

    if (password.length < 6) {
      setErr("Password must be at least 6 characters");
      return;
    }

    try {
      // You can adjust the role based on context — here using "client"
      const user = await registerWithEmailAndPassword(
        email,
        password,
        "client"
      );

      // Optionally update name (if used in your Firestore schema)
      setSuccess("🎉 Registered successfully!");
      setTimeout(onFlip, 1500); // Flip to login form
    } catch (error) {
      console.error(error);
      setErr(error.message || "Registration failed");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleRegister}>
      <h2 className={styles.title}>Register</h2>

      {err && <p className={styles.error}>{err}</p>}
      {success && <p className={styles.success}>{success}</p>}

      <input
        className={styles.input}
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        autoComplete="name"
      />

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
        placeholder="Password (min 6 characters)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        autoComplete="new-password"
      />

      <button type="submit" className={styles.actionBtn}>
        Register
      </button>

      <p className={styles.textSwitch}>
        Already have an account? <span onClick={onFlip}>Login</span>
      </p>
    </form>
  );
}
