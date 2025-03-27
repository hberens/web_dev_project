import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Parse from 'parse';
import './Account.css';
import { logoutUser } from "../Auth/AuthService";

const Account = ({setIsAuthenticated}) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    createdAt: '',
    favoriteBooks: []
  });

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const currentUser = Parse.User.current();
        if (currentUser) {
          // Get user's favorite books from localStorage
          const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
          
          setUserData({
            username: currentUser.get('username'),
            email: currentUser.get('email'),
            createdAt: currentUser.get('createdAt').toLocaleDateString(),
            favoriteBooks: favorites
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    getCurrentUser();
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();  // Use the service function
      localStorage.removeItem('isAuthenticated');
      setIsAuthenticated(false);
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="bookstore-auth-container">
      <div className="bookstore-auth-card">
        <div className="bookstore-auth-header">
          <div className="bookstore-logo">📚</div>
          <h1>My Account</h1>
        </div>

        <div className="account-info">
          <div className="info-group">
            <label>Username</label>
            <p>{userData.username}</p>
          </div>
          
          <div className="info-group">
            <label>Email</label>
            <p>{userData.email}</p>
          </div>
          
          <div className="info-group">
            <label>Member Since</label>
            <p>{userData.createdAt}</p>
          </div>

        </div>

        <div className="account-actions">
          <button 
            className="bookstore-submit-button"
            onClick={() => navigate('/books')}
          >
            Browse Books
          </button>
          <button 
            className="bookstore-submit-button logout"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Account;