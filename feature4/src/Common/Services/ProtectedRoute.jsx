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
import Parse from "parse";

const ProtectedRoute = () => {
  // Check both Parse authentication and localStorage
  const isAuthenticated = Parse.User.current() && 
                         Parse.User.current().authenticated() && 
                         localStorage.getItem("isAuthenticated") === "true";

  // If not authenticated, redirect to login page
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;