import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ component: Component }) => {
  // Retrieve the user from localStorage
  const user = localStorage.getItem("CurrentUser");

  return <>{user ? <Component /> : <Navigate to="/login" />}</>;
};

export default ProtectedRoute;
