const express = require("express");
const cors = require("cors");
const createError = require("http-errors");
const morgan = require("morgan");
const authRoutes=require("./routes/authRoutes")
const coffeeRoutes=require("./routes/coffeeRoutes")
require("dotenv").config();
require("./helper/init_mongodb");

const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth",authRoutes);
app.use("/",coffeeRoutes);

app.use((req, res, next) => {
  next(createError.NotFound("This route doesnot exist"));
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500);
  res.json({
    status: err.status || 500,
    error: err.message,
  });
});

module.exports = app;
