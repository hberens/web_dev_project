import React from "react";
import './AuthForm.css';

const AuthForm = ({ user, onChange, onSubmit, isLogin }) => {
  return (
    <div className="bookstore-auth-container">
      <div className="bookstore-auth-card">
        <div className="bookstore-auth-header">
          <div className="bookstore-logo">📖</div>
          <h1 className="bookstore-title">
            {isLogin ? "Welcome Back" : "Join Our Library"}
          </h1>
          <p className="bookstore-subtitle">
            {isLogin 
              ? "Reconnect with stories! Login to your digital library!" 
              : "Begin your literary journey with us"}
          </p>
        </div>

        <form onSubmit={onSubmit} className="bookstore-form">
          {!isLogin && (
            <div className="name-fields">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  value={user.firstName}
                  onChange={onChange}
                  name="firstName"
                  placeholder="Enter your first name"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  value={user.lastName}
                  onChange={onChange}
                  name="lastName"
                  placeholder="Enter your last name"
                  required
                />
              </div>
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={user.email}
              onChange={onChange}
              name="email"
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={user.password}
              onChange={onChange}
              name="password"
              placeholder="Password"
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="bookstore-submit-button"
          >
            {isLogin ? "Enter My Library" : "Create My Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;