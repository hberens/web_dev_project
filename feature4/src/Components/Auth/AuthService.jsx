import Parse from "parse";

// Authentication service functions for user management
// Handles login, registration, logout, and user data retrieval

// Authenticate user with email and password
export const loginUser = async (userData) => {
  try {
    const user = await Parse.User.logIn(userData.email, userData.password);
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userId", user.id);  // Store userId after login
    return user;
  } catch (error) {
    throw new Error("Invalid login credentials");
  }
};

// Create new user account with provided details
export const registerUser = async (userData) => {
  try {
    const user = new Parse.User();
    user.set("username", userData.email);
    user.set("email", userData.email);
    user.set("password", userData.password);
    user.set("firstName", userData.firstName);
    user.set("lastName", userData.lastName);

    await user.signUp();
    return user;
  } catch (error) {
    throw new Error("Error creating user account");
  }
};

// Logout current user and clear session data
export const logoutUser = async () => {
  try {
    // Log out the user using Parse
    await Parse.User.logOut();
    
    // Remove authentication and user-specific data from localStorage
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userId");  // Clear userId
    localStorage.removeItem("userRating");  // Clear user rating
    
    return true;
  } catch (error) {
    throw new Error("Error logging out");
  }
};

// Check if user is currently authenticated
export const isAuthenticated = () => {
  return Parse.User.current() && 
         Parse.User.current().authenticated() && 
         localStorage.getItem("isAuthenticated") === "true";
};

// Retrieve current user's profile data
export const getCurrentUser = async () => {
  try {
    const currentUser = Parse.User.current();
    if (currentUser) {
      return {
        username: currentUser.get("username"),
        email: currentUser.get("email"),
        createdAt: currentUser.get("createdAt").toLocaleDateString(),
        firstName: currentUser.get("firstName"),
        lastName: currentUser.get("lastName")
      };
    }
    return null;
  } catch (error) {
    throw new Error("Error fetching user data");
  }
};