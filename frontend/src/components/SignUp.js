import React, { useState } from "react";
import "./TextBox.scss";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../features/user";
import { toggle } from "../features/register";

function SignUp() {
  const dispatch = useDispatch();

  const [newUser, setNewUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const registerUser = (e) => {
    e.preventDefault();
    axios.post("http://localhost:4000/registerUser", newUser).then((res) => {
      dispatch(setUser({ userName: res.data.firstname }));
      if (res.data.firstname) dispatch(toggle({ toggleState: false }));
    });
  };

  return (
    <div className="register-modal-content">
      <h1>Sign up</h1>
      <form action="" onSubmit={(e) => registerUser(e)}>
        <div className="input-field">
          <h4>First Name</h4>
          <input
            type="text"
            placeholder="First Name"
            value={newUser.firstname}
            onChange={handleChange}
            name="firstname"
          />
        </div>
        <div className="input-field">
          <h4>Last Name</h4>
          <input
            type="text"
            placeholder="Last Name"
            value={newUser.lastname}
            onChange={handleChange}
            name="lastname"
          />
        </div>
        <div className="input-field">
          <h4>Email</h4>
          <input
            type="text"
            placeholder="Email"
            value={newUser.email}
            onChange={handleChange}
            name="email"
          />
        </div>
        <div className="input-field">
          <h4>Password</h4>
          <input
            type="password"
            placeholder="Password"
            value={newUser.password}
            onChange={handleChange}
            name="password"
          />
        </div>
        <button className="btn-color" type="submit">
          Sign up
        </button>
      </form>
    </div>
  );
}

export default SignUp;
