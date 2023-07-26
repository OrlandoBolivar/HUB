const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    createdAt: String!
    updatedAt: String!
    coffees: [Coffee!]
  }

  type Coffee {
    _id: ID!
    user: User!
    coffee: String!
    milk: String!
    size: String!
    sugar: Int!
    createdAt: String!
    updatedAt: String!
  }

  input CoffeeInput {
    coffee: String!
    milk: String!
    size: String!
    sugar: Int!
  }

  type Auth {
    token: String!
    user: User!
  }

  type Query {
    me: User
      getCoffee(_id: ID!): Coffee
      getCoffees: [Coffee!]!
  }

  type Mutation {
    login(username: String!, pin: String!): Auth
    addUser(username: String!, pin: String!): Auth
    saveCoffee(coffeeData: CoffeeInput!): Coffee
    removeCoffee(_id: ID!): Coffee
  }
`;

module.exports = typeDefs;
