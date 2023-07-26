const express = require("express");
const coffeeController = require("../controller/coffeeController");
const authenticateToken = require("../middleware/authToken");
const router = express.Router();

// Protected route to fetch all coffee data for the authenticated user
router.get("/coffee", authenticateToken, coffeeController.getAllCoffee);

// Protected route to post coffee data for the authenticated user
router.post("/coffee", authenticateToken, coffeeController.createCoffee);

// Protected route to fetch one coffee data for the authenticated user
router.get("/coffee/:id", authenticateToken, coffeeController.getOneCoffee);

// Protected route to delete one coffee data for the authenticated user
router.delete(
  "/coffee/:id",
  authenticateToken,
  coffeeController.deleteOneCoffee
);

// Protected route to delete all coffee data for the authenticated user
router.delete("/coffee", authenticateToken, coffeeController.deleteAllCoffee);

// Protected route to update one coffee data for the authenticated user
router.patch(
  "/coffee/:id",
  authenticateToken,
  coffeeController.updateOneCoffee
);

module.exports = router;
