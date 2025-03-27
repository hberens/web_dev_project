/*import Parse from "parse";

export const createUser = (newUser) => {
  const user = new Parse.User();

  user.set("username", newUser.email);
  user.set("firstName", newUser.firstName);
  user.set("lastName", newUser.lastName);
  user.set("password", newUser.password);
  user.set("email", newUser.email);

  console.log("User: ", user);

  return user
    .signUp()
    .then((newUserSaved) => {
      return newUserSaved;
    })
    .catch((error) => {
      alert(`Error: ${error.message}`);
    });
};

export const loginUser = async (user) => {
  try {
    const loggedInUser = await Parse.User.logIn(user.email, user.password);
    console.log(loggedInUser);
    return { username: loggedInUser.get("username") };
  } catch (error) {
    throw new Error("Invalid credentials");
  }
};
*/

import Parse from "parse";

// Login user
export const loginUser = async (userData) => {
  try {
    const user = await Parse.User.logIn(userData.email, userData.password);
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
    return true;
  } catch (error) {
    throw new Error("Error logging out");
  }
};

// Check if user is authenticated
export const checkUser = () => {
  return Parse.User.current() && Parse.User.current().authenticated();
};