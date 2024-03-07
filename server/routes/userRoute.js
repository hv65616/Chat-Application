const express = require("express");
// const register = require("../controllers/userController");
// const login = require("../controllers/userController")
const userController = require("../controllers/userController");
const router = express.Router();
router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/setAvatar/:id", userController.setAvatar);
router.get("/allusers/:id", userController.allUsers);
module.exports = router;
