const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
const app = express();
const port = process.env.PORT || 8081;
const mongourl = process.env.MONGO_URL;
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

app.listen(port, (req, res) => {
  console.log(`Server is running on ${port}`);
});
