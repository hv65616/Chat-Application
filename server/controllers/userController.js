const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const register = async (req, res, next) => {
  //   console.log(req.body);
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username: username });
    if (usernameCheck) {
      return res.json({
        msg: "Username already used",
        status: false,
      });
    }
    const emailCheck = await User.findOne({ email: email });
    if (emailCheck) {
      return res.json({
        msg: "Email already used",
        status: false,
      });
    }
    const hashpassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashpassword,
    });
    delete user.password;
    return res.json({
      status: true,
      user,
    });
  } catch (error) {
    console.log(`Error:- ${error}`);
    next(error);
  }
};
const login = async (req, res, next) => {
  //   console.log(req.body);
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.json({
        msg: "Incorrect username",
        status: false,
      });
    }
    const ispasswordvalid = await bcrypt.compare(password, user.password);
    if (!ispasswordvalid) {
      return res.json({
        msg: "Incorrect password",
        status: false,
      });
    }
    delete user.password
    return res.json({
      status: true,
      user,
    });
  } catch (error) {
    console.log(`Error:- ${error}`);
    next(error);
  }
};
module.exports = { register, login };
