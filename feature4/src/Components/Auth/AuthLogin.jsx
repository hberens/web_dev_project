// AuthLogin component handles user login functionality
// Uses AuthForm component for the login form UI
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "./AuthForm";
import { loginUser } from "./AuthService";

const AuthLogin = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  // State for login form data
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  // Handle input changes in the login form
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Handle form submission and user authentication
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const loggedInUser = await loginUser(user);
      setIsAuthenticated(true);
      alert(`Welcome back, ${loggedInUser.get("username")}!`);
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <AuthForm
        user={user}
        onChange={onChangeHandler}
        onSubmit={onSubmitHandler}
        isLogin={true}
      />
      {/* Navigation links for registration and home page */}
      <div className="auth-links">
        <p>New to our library? 
          <button 
            onClick={() => navigate("/register")}
            className="link-button"
          >
            Create an account
          </button>
        </p>
        <button 
          onClick={() => navigate("/")}
          className="back-button"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default AuthLogin;
