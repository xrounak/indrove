// src/context/UILoadingContext.jsx
import { createContext, useContext, useState } from "react";

const UILoadingContext = createContext();

export const UILoadingProvider = ({ children }) => {
  const [uiLoading, setUILoading] = useState(false);
  const [loadingTrace, setTrace] = useState(""); // optional for debug

  const startLoading = (label = "") => {
    console.log(`[UI LOADING START] ${label}`);
    setTrace(label);
    setUILoading(true);
  };

  const stopLoading = () => {
    console.log(`[UI LOADING END] ${loadingTrace}`);
    setTrace("");
    setUILoading(false);
  };

  return (
    <UILoadingContext.Provider value={{ uiLoading, startLoading, stopLoading }}>
      {children}
    </UILoadingContext.Provider>
  );
};

export const useUILoading = () => useContext(UILoadingContext);
