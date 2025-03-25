import { Navigate, Outlet } from "react-router-dom";
import Parse from "parse";

const ProtectedRoute = () => {
  const currentUser = Parse.User.current().authenticated(); // Check if user is logged in
  console.log(currentUser);
  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
