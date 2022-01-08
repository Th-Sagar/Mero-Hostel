import React, { useState } from "react";
import "./TextBox.scss";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../features/user";
import { toggle } from "../features/register";

function SignIn() {
  const dispatch = useDispatch();

  const [user, setLogUser] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setLogUser({
      ...user,
      [name]: value,
    });
  };

  const loginUser = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/login", user, { withCredentials: true })
      .then((res) => {
        if (res.data.user) {
          const { _id, firstname, lastname, email, doj } = res.data.user;
          dispatch(
            setUser({
              id: _id,
              firstName: firstname,
              lastName: lastname,
              email: email,
              doj: doj,
            })
          );
          dispatch(toggle({ toggleState: false }));
        } else {
          alert(res.data.msg);
        }
      });
  };

  return (
    <div className="register-modal-content">
      <h1>Sign in</h1>
      <form action="" onSubmit={(e) => loginUser(e)}>
        <div className="input-field">
          <h4>Email</h4>
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </div>
        <div className="input-field">
          <h4>Password</h4>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
        </div>
        <button className="btn-color" type="submit">
          Sign in
        </button>
        <p
          className="bottom-text"
          onClick={() => dispatch(toggle({ toggleState: true, sign: "up" }))}
        >
          Not a member? <span>Register Now</span>
        </p>
      </form>
    </div>
  );
}

export default SignIn;
