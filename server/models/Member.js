const { Schema, model } = require ('mongoose');
const bcrypt = require('bcrypt');

const coffeeSchema = ('./Coffee');

const userSchema = new Schema(
    {
        username: {
            type: String,
            require: true,
            unique: true,
        },

        pin: {
            type: Number,
            require: true,
        },

        savedCoffee: [coffeeSchema],
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);

userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
  });

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.virtual('coffeeCount').get(function () {
    return this.savedCoffees.length;
  });
  
  const User = model('User', userSchema);
  
  module.exports = User;