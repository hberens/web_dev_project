// AuthRegister component handles new user registration
// Uses AuthForm component for the registration form UI
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "./AuthService";
import AuthForm from "./AuthForm";

const AuthRegister = () => {
  const navigate = useNavigate();
  // State for registration form data
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  // flag is the state to watch for add/remove updates
  const [add, setAdd] = useState(false);

  // Effect to handle user registration when form is submitted
  useEffect(() => {
    if (newUser && add) {
      registerUser(newUser).then((userCreated) => {  // Use the service function
        if (userCreated) {
          alert(`${userCreated.get("firstName")}, you successfully registered!`);
        }
        setAdd(false);
      });
    }
  }, [newUser, add]);

  // Handle input changes in the registration form
  const onChangeHandler = (e) => {
    e.preventDefault();
    const { name, value: newValue } = e.target;
    setNewUser({ ...newUser, [name]: newValue });
  };

  // Handle form submission and trigger registration
  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log("submitted: ", e.target);
    setAdd(true);
  };

  return (
    <div>
      <AuthForm
        user={newUser}
        onChange={onChangeHandler}
        onSubmit={onSubmitHandler}
      />
      <button onClick={() => navigate("/")}>Back to Home</button>{" "}
    </div>
  );
};

export default AuthRegister;
