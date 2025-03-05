import React from "react";
import { Link } from "react-router-dom"; // We'll use React Router for navigation
import "../../styles.css"; // Import CSS file

// nav bar for all pages- link to Home, Books Page, and Favorites
const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li className="books-page">
          <Link to="/books" className="nav-link">
            Books
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/favorites" className="nav-link">
            Favorites
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;