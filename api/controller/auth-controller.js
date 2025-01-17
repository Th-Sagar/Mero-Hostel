import User from "../model/user-model.js";

const register = async (req, res) => {
  try {
    const { email, password, isAdmin, lastname, firstname } = req.body;
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }
    const userCreated = await User.create({
      firstname,
      lastname,

      email,
      password,

      isAdmin,
    });
    res.status(201).json({
      msg: "User created successfully",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    console.log("Error in register", error);
  }
};

const login = async (req, res) => {
  try {
    const { password, email } = req.body;
    const userExist = await User.findOne({ email: email });
    const user = await userExist.comparePassword(password);

    if (user) {
      res.status(200).json({
        msg: "User login successfully",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      res.status(400).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.log("Error from the login controller", error);
  }
};

const user = async (req, res) => {
  try {
    const { email } = req.body;
    const userExist = await User.findOne({ email: email }, { password: 0 });
    res.status(200).json({ user: userExist });
  } catch (error) {
    console.log(error);
  }
};

const userToken = async (req, res) => {
  try {
    const userData = req.user;
    return res.status(200).json({ user: userData });
  } catch (error) {
    console.log("Error from the userToken controller", error);
  }
};
export  { login, register, user, userToken };
