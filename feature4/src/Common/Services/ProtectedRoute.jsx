/*import { Navigate, Outlet } from "react-router-dom";
import Parse from "parse";

const ProtectedRoute = () => {
  const currentUser = Parse.User.current().authenticated(); // Check if user is logged in
  console.log(currentUser);
  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
*/
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../../Components/Auth/AuthService";

const ProtectedRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;