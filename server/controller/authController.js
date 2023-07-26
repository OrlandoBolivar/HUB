const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const config = require("../config/config");
const createError = require("http-errors");

exports.register = async (req, res, next) => {
  const { username, pin } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      throw createError.Conflict("Username already exists");
    }
    const user = new User({ username, pin });
    await user.save();
    res.json(user);
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const { username, pin } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      throw createError.Unauthorized("Invalid username or pin");
    }
    const isPinValid = await user.isCorrectPin(pin);
    if (!isPinValid) {
      throw createError.Unauthorized("Invalid username or pin");
    }
    const token = jwt.sign({ userId: user._id }, config.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    next(error);
  }
};
