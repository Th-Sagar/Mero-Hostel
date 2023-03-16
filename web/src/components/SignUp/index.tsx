import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setUser } from "../../store/user";
import { toggle } from "../../store/register";
import { popupModal } from "../../store/popupModal";
import { backendUrl } from "../../utils/helper";
import "../TextBox.scss";

function SignUp() {
  const dispatch = useDispatch();

  const [newUser, setNewUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  let checkFields =
    newUser.firstname && newUser.lastname && newUser.email && newUser.password;

  const registerUser = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!checkFields) {
      return dispatch(popupModal({ message: "Empty Fields", cName: "red" }));
    }
    axios.post(`${backendUrl}/registerUser`, newUser).then((res) => {
      if (res.data.newUser) {
        const { _id, firstname, lastname, email, doj, profilePic } =
          res.data.newUser;
        dispatch(
          setUser({
            id: _id,
            firstName: firstname,
            lastName: lastname,
            email: email,
            doj: doj,
            profilePic: profilePic,
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
        <p
          className="bottom-text"
          onClick={() => dispatch(toggle({ toggleState: true, sign: "in" }))}
        >
          Already a member? <span>SignIn Now</span>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
