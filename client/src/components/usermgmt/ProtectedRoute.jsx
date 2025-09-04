import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // stored when user logs in

  if (!token) {
    // if no token → redirect to login
    return <Navigate to="/login" replace />;
  }

  return children; // if token exists → allow access
};

export default ProtectedRoute;
