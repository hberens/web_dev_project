
// ProtectedRoute component ensures that only authenticated users can access certain routes
// If user is not authenticated, they are redirected to the login page

import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../../Components/Auth/AuthService";

const ProtectedRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;