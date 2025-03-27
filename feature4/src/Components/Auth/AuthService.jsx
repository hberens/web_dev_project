import Parse from "parse";

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
