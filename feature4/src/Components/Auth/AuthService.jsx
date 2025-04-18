import Parse from "parse";

// Login user
export const loginUser = async (userData) => {
  try {
    const user = await Parse.User.logIn(userData.email, userData.password);
    localStorage.setItem("isAuthenticated", "true");
    return user;
  } catch (error) {
    throw new Error("Invalid login credentials");
  }
};

// Register user
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

// Logout user
export const logoutUser = async () => {
  try {
    await Parse.User.logOut();
    localStorage.removeItem("isAuthenticated");
    return true;
  } catch (error) {
    throw new Error("Error logging out");
  }
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return Parse.User.current() && 
         Parse.User.current().authenticated() && 
         localStorage.getItem("isAuthenticated") === "true";
};

// Get current user data
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