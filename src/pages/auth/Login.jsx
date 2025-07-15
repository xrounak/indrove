import { useState } from "react";
import styles from "./Auth.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getUserData } from "../../services/authService";
import { useAuthActions } from "../../hooks/useAuth";
import { useUILoading } from "../../context/UILoadingContext ";
import { GoogleButton } from "../../components/ui/ContinueWithGoogle";

export default function Login({ onFlip }) {
  const { loginWithEmailAndPassword, signInWithGoogle } = useAuthActions();
  const { startLoading, stopLoading } = useUILoading();
  const { setUser, setUserData } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErr("");
    startLoading();

    try {
      const user = await loginWithEmailAndPassword(email, password);
      console.log("✅ Logged in as:", user.email);

      const data = await getUserData(user.uid);
      if (setUserData) setUserData(data);
      if (setUser) setUser(user);

      navigate("/");
    } catch (error) {
      console.error("❌ Login error:", error);
      setErr(error.message || "Login failed");
    } finally {
      stopLoading();
    }
  };

  const handleGoogleLogin = async () => {
    setErr("");
    startLoading();

    try {
      await signInWithGoogle("babu hai hum"); // default role
      navigate("/");
    } catch (error) {
      console.error("❌ Google login error:", error);
      setErr(error.message || "Google login failed");
    } finally {
      stopLoading();
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

      <div className="relative my-4 w-full flex items-center justify-center">
        <div className="absolute w-full h-px bg-neutral-700" />
        <span className="bg-[#1f1f1f] px-4 text-xs text-neutral-400 z-10">or</span>
      </div>

      <GoogleButton onClick={handleGoogleLogin} />
    </form>
  );
}
