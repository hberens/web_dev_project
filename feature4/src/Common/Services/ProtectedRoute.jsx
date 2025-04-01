import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../../Components/Auth/AuthService";

const ProtectedRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;