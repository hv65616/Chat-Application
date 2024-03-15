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

app.listen(port, (req, res) => {
  console.log(`Server is running on ${port}`);
});
