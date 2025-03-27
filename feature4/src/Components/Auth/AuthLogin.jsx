import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "./AuthForm";
import { loginUser } from "./AuthService";

const AuthLogin = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const loggedInUser = await loginUser(user);
      setIsAuthenticated(true); // Set authentication state to true
      localStorage.setItem("isAuthenticated", "true"); // Store auth state in localStorage
      alert(`Welcome back, ${loggedInUser.username}!`);
      navigate("/"); // Navigate to home page
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogout = async () => {
    await Parse.User.logOut();
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  return (
    <div>
      <AuthForm
        user={user}
        onChange={onChangeHandler}
        onSubmit={onSubmitHandler}
        isLogin={true}
      />
      <button onClick={handleLogout}>Logout</button>
      <button onClick={() => navigate("/")}>Back to Home</button>{" "}
      {/* Back button */}
    </div>
  );
};

export default AuthLogin;
