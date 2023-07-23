const Coffee = require('../models/coffeeModel');
const createError = require('http-errors');

exports.getAllCoffee = async (req, res, next) => {
  const userId = req.user.userId; // Get the user ID from the JWT token's payload
  try {
    const userCoffeeData = await Coffee.find({ createdBy: userId });
    res.json(userCoffeeData);
  } catch (error) {
    next(createError(500, 'Failed to fetch coffee data'));
  }
};

exports.getOneCoffee = async (req, res, next) => {
  const coffeeId = req.params.id;
  const userId = req.user.userId; // Get the user ID from the JWT token's payload

  try {
    const coffee = await Coffee.findOne({ _id: coffeeId, createdBy: userId });
    if (!coffee) {
      return next(createError(404, 'Coffee not found'));
    }
    res.json(coffee);
  } catch (error) {
    next(createError(500, 'Failed to fetch coffee data'));
  }
};

exports.deleteOneCoffee = async (req, res, next) => {
  const coffeeId = req.params.id;
  const userId = req.user.userId; // Get the user ID from the JWT token's payload

  try {
    const deletedCoffee = await Coffee.findOneAndDelete({ _id: coffeeId, createdBy: userId });
    if (!deletedCoffee) {
      return next(createError(404, 'Coffee not found'));
    }
    res.json(deletedCoffee);
  } catch (error) {
    next(createError(500, 'Failed to delete coffee'));
  }
};

exports.deleteAllCoffee = async (req, res, next) => {
  const userId = req.user.userId; // Get the user ID from the JWT token's payload

  try {
    await Coffee.deleteMany({ createdBy: userId });
    res.json({ message: 'All coffee deleted successfully' });
  } catch (error) {
    next(createError(500, 'Failed to delete coffee'));
  }
};

exports.updateOneCoffee = async (req, res, next) => {
  const coffeeId = req.params.id;
  const userId = req.user.userId; // Get the user ID from the JWT token's payload

  try {
    const updatedCoffee = await Coffee.findOneAndUpdate(
      { _id: coffeeId, createdBy: userId },
      req.body,
      { new: true }
    );
    if (!updatedCoffee) {
      return next(createError(404, 'Coffee not found'));
    }
    res.json(updatedCoffee);
  } catch (error) {
    next(createError(500, 'Failed to update coffee'));
  }
};
