import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import "./App.css";
import { useNavigate } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes"; // ✅ Fixed import
import { Suspense } from "react";
import Loader from "./components/feedback/Loader";
import { ToastContainer } from "react-toastify";

function App() {
  const { loading } = useAuth();
  return (
    <center>
      <Router>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          pauseOnHover
          theme="dark"
        />
        <Suspense fallback={<Loader />}>
          <AppRoutes />
        </Suspense>
        {loading && <Loader />}
      </Router>
    </center>
  );
}

export default App;
