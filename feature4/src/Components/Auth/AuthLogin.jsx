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
      {/*buttons to register and go hom*/}
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
