import { Navigate, Outlet } from "react-router-dom";
import Parse from "parse";

const AuthRoute = () => {
  // Check if user is authenticated
  const isAuthenticated = Parse.User.current() && 
                         Parse.User.current().authenticated() && 
                         localStorage.getItem("isAuthenticated") === "true";

  // If authenticated, redirect to home. If not, allow access to auth routes
  return !isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default AuthRoute;
