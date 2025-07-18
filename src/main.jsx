
import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { UILoadingProvider } from "./context/UILoadingContext .jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <UILoadingProvider>
        <App />
      </UILoadingProvider>
    </AuthProvider>

  </StrictMode>

);
