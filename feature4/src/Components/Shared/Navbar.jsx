import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles.css"; // Import CSS file
import logo from "../../assets/bookbridge-logo.png"; // Import logo image

const Navbar = ({ isAuthenticated }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle menu visibility

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle the menu visibility
  };

  return (
    <nav>
      <div className="logo">
        <img src={logo} alt="BookBridge Logo" className="logo-image" />
        <span>BookBridge</span>
      </div>

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
        {/* if they are logged in display an ccount page  */}
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
