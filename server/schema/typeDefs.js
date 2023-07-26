const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    coffeeCount: Int
    savedCoffees: [Coffee]
  }

  type Coffee {
    coffeeId: ID!
    typeOfCoffee: String
    typeMilk: String
    size: String
    sugar: String
  }

  type Auth {
    token: ID!
    user: User
  }

  input CoffeeInput {
    typeOfCoffee: String!
    typeMilk: String!
    coffeeId: String!
    size: String!
    sugar: String!
  }

  type Query {
    me: User
  }

  type Mutation {
    login(username: String!, pin: String!): Auth
    addUser(username: String!, pin: String!): Auth
    saveCoffee(coffeeData: CoffeeInput!): User  # Corrected from 'coffeeInput' to 'CoffeeInput'
    removeCoffee(coffeeId: ID!): User
  }
`;

module.exports = typeDefs;
