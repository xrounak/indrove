
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import "./App.css";
import { useNavigate } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes"; // ✅ Fixed import
import { Suspense } from "react";
import Loader from "./components/feedback/Loader";

function App() {
  // const { loading, user, userData } = useAuth();
  // // const navigate = useNavigate(); // ✅ Correct placement

  // // ✅ Properly defined click handler
  // const handleClick = () => {
  //   // navigate("/login"); // or "/signup" or any route you have
  // };

  // if (loading) {
  //   return <p>🔄 Checking login status...</p>;
  // }

  return (
    <center>
      {/* <div className="container">
        <h1>Welcome</h1>
        {user ? (
          <>
            <p>Logged in as: {user.email}</p>
            <p>Role: {userData?.role}</p>
          </>
        ) : (
          <div>
            <p>You're not logged in.</p>
            <button onClick={handleClick}>Get Started</button>
          </div>
        )}
      </div> */}
    <Router>
        <AppRoutes />
    </Router>
    </center>
  );
}

export default App;
