import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../../Components/Auth/AuthService";

const AuthRoute = () => {
  return !isAuthenticated() ? <Outlet /> : <Navigate to="/" replace />;
};

export default AuthRoute;
