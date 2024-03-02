const mongoose = require("mongoose");
const { required } = require("nodemon/lib/config");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: [3, "Username must have atleast of 3 characters"],
    maxLength: [20, "Username cannot exceed more than 20 characters"],
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minLength: [3, "Email must have atleast of 3 characters"],
    maxLength: [20, "Email cannot exceed more than 20 characters"],
  },
  password: {
    type: String,
    required: true,
    minLength: [8, "Password must be at least 8 characters long"],
  },
  isAvatarImageSet: {
    type: Boolean,
    default: false,
  },
  avatarImage: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("User", userSchema);
