import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import "./App.css";
import { useNavigate } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes"; // ✅ Fixed import
import { Suspense } from "react";
import Loader from "./components/feedback/Loader";
import { ToastContainer } from "react-toastify";

import { Layout } from "./routes/Layout";

function App() {
  const { loading } = useAuth();
  return (
      <Router>
        
    <Layout>
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
        </Layout>
      </Router>
  
  );
}

export default App;
