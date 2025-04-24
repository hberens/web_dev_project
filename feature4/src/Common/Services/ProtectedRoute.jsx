
// ProtectedRoute component ensures that only authenticated users can access certain routes
// If user is not authenticated, they are redirected to the login page
//import React from "react";
//import { Navigate } from "react-router-dom";
//import { useAuth } from "../../Context/AuthContext";



import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../../Components/Auth/AuthService";

const ProtectedRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
/*const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  // Redirect to login if not authenticated, otherwise render the protected content
  return isAuthenticated ? children : <Navigate to="/login" />;
};*/