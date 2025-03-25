import React from "react";

const AuthForm = ({ user, onChange, onSubmit, isLogin }) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        {!isLogin && ( // Only show these fields if not in login mode
          <>
            <div>
              <label>First Name</label>
              <br />
              <input
                type="text"
                value={user.firstName}
                onChange={onChange}
                name="firstName"
                placeholder="First Name"
                required
              />
            </div>
            <div>
              <label>Last Name</label>
              <br />
              <input
                type="text"
                value={user.lastName}
                onChange={onChange}
                name="lastName"
                placeholder="Last Name"
                required
              />
            </div>
          </>
        )}
        <div>
          <label>Email</label>
          <br />
          <input
            type="email"
            value={user.email}
            onChange={onChange}
            name="email"
            placeholder="Email"
            required
          />
        </div>
        <div>
          <label>Password</label>
          <br />
          <input
            type="password"
            value={user.password}
            onChange={onChange}
            name="password"
            placeholder="Password"
            required
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
