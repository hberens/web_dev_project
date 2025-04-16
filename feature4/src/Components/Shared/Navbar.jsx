import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles.css"; // Import CSS file

const Navbar = ({ isAuthenticated }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle menu visibility

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle the menu visibility
  };

  return (
    <nav>
      <div className="logo">Book App</div>

      {/* Hamburger menu icon */}
      <div className="hamburger-menu" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      {/* Navigation links */}
      <ul className={`nav-list ${isMenuOpen ? "active" : ""}`}>
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/books" className="nav-link">
            Books
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/favorites" className="nav-link">
            Favorites
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/books/search" className="nav-link">
            Search Books
          </Link>
        </li>
        {isAuthenticated ? (
          <li className="nav-item">
            <Link to="/account" className="nav-link">
              Account
            </Link>
          </li>
        ) : (
          <li className="nav-item">
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </li>
          
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
