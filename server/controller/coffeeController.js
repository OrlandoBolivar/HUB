const Coffee = require("../models/coffeeModel");
const createError = require("http-errors");

exports.createCoffee = async (req, res, next) => {
  const userId = req.user._id;
  const { coffee, milk, size, sugar } = req.body;
  try {
    const newCoffee = new Coffee({
      user: userId,
      coffee,
      milk,
      size,
      sugar,
    });

    const savedCoffee = await newCoffee.save();
    res.status(200).json(savedCoffee);
  } catch (error) {
    next(createError(500, "Failed to create coffee"));
  }
};

exports.getAllCoffee = async (req, res, next) => {
  const userId = req.user._id;
  try {
    const userCoffeeData = await Coffee.find({ user: userId });
    res.json(userCoffeeData);
  } catch (error) {
    next(createError(500, "Failed to fetch coffee data"));
  }
};

exports.getOneCoffee = async (req, res, next) => {
  const coffeeId = req.params.id;
  const userId = req.user._id;

  try {
    const coffee = await Coffee.findOne({ _id: coffeeId, user: userId });
    if (!coffee) {
      return next(createError(404, "Coffee not found"));
    }
    res.json(coffee);
  } catch (error) {
    next(createError(500, "Failed to fetch coffee data"));
  }
};

exports.deleteOneCoffee = async (req, res, next) => {
  const coffeeId = req.params.id;
  const userId = req.user._id;
  try {
    const deletedCoffee = await Coffee.findOneAndDelete({
      _id: coffeeId,
      user: userId,
    });
    if (!deletedCoffee) {
      return next(createError(404, "Coffee not found"));
    }
    res.json(deletedCoffee);
  } catch (error) {
    next(createError(500, "Failed to delete coffee"));
  }
};

exports.deleteAllCoffee = async (req, res, next) => {
  const userId = req.user._id;
  try {
    await Coffee.deleteMany({ user: userId });
    res.json({ message: "All coffee deleted successfully" });
  } catch (error) {
    next(createError(500, "Failed to delete coffee"));
  }
};

exports.updateOneCoffee = async (req, res, next) => {
  const coffeeId = req.params.id;
  const userId = req.user._id;

  try {
    const updatedCoffee = await Coffee.findOneAndUpdate(
      { _id: coffeeId, user: userId },
      req.body,
      { new: true }
    );
    if (!updatedCoffee) {
      return next(createError(404, "Coffee not found"));
    }
    res.json(updatedCoffee);
  } catch (error) {
    next(createError(500, "Failed to update coffee"));
  }
};
