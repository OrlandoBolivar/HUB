const { Schema, model } = require("mongoose");

const coffeeSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User", // 'User' refers to the model name for the User schema
      required: true,
    },
    coffee: {
      type: String,
      required: true,
    },
    milk: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    sugar: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Coffee = model("Coffee", coffeeSchema);

module.exports = Coffee;
