const { AuthenticationError } = require('apollo-server-express');
const User  = require('../models/userModel');
const jwt = require("jsonwebtoken");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select('-__v -password');

        return userData;
      }

      throw new AuthenticationError('Not logged in');
    },
  },

  Mutation: {
    addUser: async (parent, {username,pin}) => {
      const user = new User({ username, pin });
      await user.save();
      return { user };
    },
    login: async (parent, { username, pin }) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const correctPw = await user.isCorrectPassword(pin);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const token = jwt.sign({ userId: user._id }, config.JWT_SECRET, {
        expiresIn: "1h",
      });
      return { token, user };
    },
    // saveCoffee: async (parent, { coffeeData }, context) => {
    //   if (context.user) {
    //     const updatedUser = await User.findByIdAndUpdate(
    //       { _id: context.user._id },
    //       { $push: { savedCoffees: coffeeData } },
    //       { new: true }
    //     );

    //     return updatedUser;
    //   }

    //   throw new AuthenticationError('You need to be logged in!');
    // },
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