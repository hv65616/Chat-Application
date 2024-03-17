const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoute");
const messageRoutes = require("./routes/messagesRoute");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const port = process.env.PORT || 8081;
const mongourl = process.env.MONGO_URL;
const app = express();
const http = require("http").Server(app);
const socket = require("socket.io")(http);
const corsOptions = {
  origin: "https://bingle.onrender.com",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(cors());
app.use(express.json());

mongoose
  .connect(mongourl, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connection Successful");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api/auth", userRoutes);
app.use("/api/message", messageRoutes);

const server = http.listen(port, (req, res) => {
  console.log(`Server is running on ${port}`);
});

const io = socket(server, {
  cors: {
    origin: "https://bingle.onrender.com/",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});
global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });
  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.message);
    }
  });
});
