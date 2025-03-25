/* For future work*/
import React from "react";
import "../../styles.css";
import { useNavigate } from "react-router-dom";
import Parse from "parse";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await Parse.User.logOut();
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  return (
    <div className="home-container">
      <h1>Welcome to the Book App!</h1>
      <p>
        Discover and explore a wide variety of books. You can browse through
        different categories, add books to your favorites, and even leave
        comments about them.
      </p>
      <button onClick={handleLogout}>Logout</button>
      <button><a href="/login" class="login-button">Log In</a></button>
    </div>
  );
};

export default Home;