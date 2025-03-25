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
      alert(`Welcome back, ${loggedInUser.username}!`);
      navigate("/home");
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
      <button onClick={() => navigate("/")}>Back to Home</button>{" "}
      {/* Back button */}
    </div>
  );
};

export default AuthLogin;
