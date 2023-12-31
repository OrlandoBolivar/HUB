const { Schema, model } = require('mongoose');
const bcrypt=require("bcrypt")

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    pin: {
      type: String,
      required: true,
    },
    coffees: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Coffee',
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('pin')) {
    const saltRounds = 10;
    this.pin = await bcrypt.hash(this.pin, saltRounds);
  }
  next();
});

userSchema.methods.isCorrectPin = async function (pin) {
  return bcrypt.compare(pin.toString(), this.pin);
};

const User = model('User', userSchema);

module.exports = User;
