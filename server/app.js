const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const { typeDefs, resolvers } = require('./schema/index');
const config = require("./config/config");
const jwt = require('jsonwebtoken'); // Import the jwt library
const app = express();
const User = require("./models/userModel")

// Connect to your MongoDB database
// mongoose.connect(config.DATABASE, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/hub');

// Create an async function to start the Apollo Server
async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      const token = req.headers.authorization || '';
      try {
        const decodedToken = await jwt.verify(token.replace('Bearer ', ''), config.JWT_SECRET);
        const user = await User.findById(decodedToken.userId);
        console.log(user, "user in context function");
        return { user };
      } catch (error) {
        console.log(error);
        return {};
      }
    }
  }
  );

  await server.start(); // Await the server start before applying the middleware
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startApolloServer();
