const express = require("express");
const register = require("../controllers/userController");
const { model } = require("mongoose");
const router = express.Router();
router.post("/register", register);
module.exports = router