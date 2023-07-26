import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($username: String!, $pin: String!) {
    login(username: $username, pin: $pin) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_MEMBER = gql`
  mutation addUser($username: String!, $pin: String!) {
    addUser(username: $username, pin: $pin) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_COFFEE = gql`
  mutation saveCoffee($coffeeData: CoffeeInput!) {
    saveCoffee(coffeeData: $coffeeData) {
      _id
      username
      savedCoffees {
        coffeeId
        typeOfCoffee
        typeMilk
        size
        sugar
      }
    }
  }
`;

export const REMOVE_COFFEE = gql`
  mutation removeCoffee($coffeeId: ID!) {
    removeCoffee(coffeeId: $coffeeId) {
      _id
      username
      savedCoffees {
        coffeeId
        typeOfCoffee
        typeMilk
        size
        sugar
      }
    }
  }
`;