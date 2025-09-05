import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // stored when user logs in
  const refresh_token = localStorage.getItem("refresh_token");

  if (!token) {
    // if no token → redirect to login
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; // in seconds
    if (token === refresh_token) {
      if (decoded.exp < currentTime) {
        alert("Login expired. Please Login again.")
      }
      else {
        return children;
      }
    }
    else {
      if (decoded.exp < currentTime) {
        localStorage.setItem("token", refresh_token)
      }
      return children;
    }
  } catch (err) {
    alert("Invalid Login. Please Login again.")
    return <Navigate to="/login" replace /> // token malformed
  }
};

export default ProtectedRoute;
