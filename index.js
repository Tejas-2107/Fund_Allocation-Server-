const express = require('express');
const mongoose = require("mongoose");
const app = express();
const userRoute = require('./routes/userroute');
const adminRoute = require('./routes/adminroute');
const dotenv = require("dotenv");

dotenv.config();

app.use(express.json());
mongoose.set("strictQuery", true);
app.use(express.urlencoded());

mongoose.connect("mongodb://127.0.0.1:27017/budget", { useNewUrlParser: true });

app.use("/user", userRoute);
app.use("/admin", adminRoute);

app.listen(5000, (req, res) => {
  console.log("Server Started on the port 5000");
});




