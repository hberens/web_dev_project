import React from "react";
import "./Home.css"
import { useNavigate } from "react-router-dom";
import Parse from "parse";
import logo from "../../assets/bookbridge-logo.png";

const Home = ({ isAuthenticated }) => {
  const navigate = useNavigate();

  const currentUser = isAuthenticated ? Parse.User.current() : null;

  const handleLoginRedirect = () => {
    navigate("/login"); 
  };
  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="home-container">
      <div className="home-header">
        <img src={logo} alt="BookBridge Logo" className="home-logo" />
        <h1>Welcome to BookBridge!</h1>
      </div>
      <p>
        Discover and explore a wide variety of books. You can browse through
        different categories, add books to your favorites, leave and read
        comments about them, leave ratings, search for books, and more!
      </p>
      { !isAuthenticated ? (
        <>
        <button onClick={handleLoginRedirect} className="login-button">
          Log In
        </button>
        <button onClick={handleRegister} className="register-button">
          Register
        </button>
        </>
      ) : (
        <p className="welcome-back">
          Hi, {currentUser.getUsername()}! Glad to see you back.
        </p>
      )}
    </div>
  );
};

export default Home;