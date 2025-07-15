import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/feedback/Loader";
import Navbar from "../components/ui/Navbar";

export const Layout = ({ children }) => {
  const { loading } = useAuth();

  useEffect(() => {
    console.log("Auth loading state changed:", loading);
  }, [loading]);

  return (
    <>
      <>
        <Navbar></Navbar>
        {children}
      </>
      {loading && <Loader />}
    </>
  );
};
