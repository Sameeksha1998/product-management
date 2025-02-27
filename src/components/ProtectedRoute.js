import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = ({ children, roleRequired }) => {
  const { isAuthenticated, role } = useAuth();
  const location = useLocation();

  // If user is not authenticated, redirect to login with `from` param
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If user role doesn't match the required role, redirect to home
  if (roleRequired && role !== roleRequired) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default ProtectedRoute;
