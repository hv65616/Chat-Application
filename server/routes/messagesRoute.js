const express = require("express");
const messagesController = require("../controllers/messagesController");
const router = express.Router();
router.post("/addmessage", messagesController.addMessage);
router.post("/getmessage", messagesController.getAllMessage);
module.exports = router;
