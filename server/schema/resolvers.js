const User = require('../models/userModel');
const Coffee = require('../models/coffeeModel');
const jwt = require("jsonwebtoken");
const { AuthenticationError } = require('apollo-server-express');
const { UserInputError } = require('apollo-server-errors');
const config = require("../config/config")

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      console.log(context);
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select('-__v -password');
        console.log(userData);
        return userData;
      }

      throw new AuthenticationError('Not logged in');
    },
  },

  Mutation: {
    addUser: async (parent, { username, pin }) => {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        throw new UserInputError('Username already taken', {
          code: 'USERNAME_ALREADY_TAKEN',
        });
      }

      const user = new User({ username, pin });
      await user.save();

      // Generate the token
      const token = jwt.sign({ userId: user._id }, config.JWT_SECRET, {
        expiresIn: '1h',
      });

      // Return both the user object and the token in the response
      return { token, user };
    },
    login: async (parent, { username, pin }) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const correctPw = await user.isCorrectPin(pin);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const token = jwt.sign({ userId: user._id }, config.JWT_SECRET, {
        expiresIn: "1h",
      });
      return { token, user };
    },
    saveCoffee: async (parent, { coffeeData }, context) => {
      if (context.user) {
        const coffee = new Coffee({
          user: context.user._id,
          coffee: coffeeData.coffee,
          milk: coffeeData.milk,
          size: coffeeData.size,
          sugar: coffeeData.sugar,
        });

        const savedCoffee = await coffee.save();

        // Update the user's coffees field with the saved coffee
        await User.findByIdAndUpdate(context.user._id, { $push: { coffees: savedCoffee } });

        return savedCoffee;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    // removeCoffee: async (parent, { coffeeId }, context) => {
    //   if (context.user) {
    //     const updatedUser = await User.findOneAndUpdate(
    //       { _id: context.user._id },
    //       { $pull: { savedCoffees: { coffeeId } } },
    //       { new: true }
    //     );

    //     return updatedUser;
    //   }

    //   throw new AuthenticationError('You need to be logged in!');
    // },
  },
};

module.exports = resolvers;