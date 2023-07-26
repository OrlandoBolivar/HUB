const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const User = require("../models/userModel");
const config = require("../config/config");

const authenticateToken = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return next(createError.Unauthorized("Authentication token required"));
  }
  try {
    const decodedToken = jwt.verify(token, config.JWT_SECRET);
    const user = await User.findById(decodedToken.userId);
    if (!user) {
      return next(createError.Unauthorized("User not found"));
    }
    req.user = user;
    next();
  } catch (error) {
    return next(createError.Forbidden("Invalid token"));
  }
};

module.exports = authenticateToken;
