/* For future work*/
import React from "react";
import "../../styles.css";
import { useNavigate } from "react-router-dom";
import Parse from "parse";

const Home = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate("/login"); 
  };
  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="home-container">
      <h1>Welcome to the Book App!</h1>
      <p>
        Discover and explore a wide variety of books. You can browse through
        different categories, add books to your favorites, and even leave
        comments about them.
      </p>
      <button onClick={handleLoginRedirect} className="login-button">
        Log In
      </button>
      <button onClick={handleRegister} className="register-button">
        Register
      </button>
    </div>
  );
};

export default Home;