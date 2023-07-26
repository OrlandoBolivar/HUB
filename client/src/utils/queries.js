import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query {
    me {
      _id
      username
      coffees {
        _id
        coffee
        milk
        size
        sugar
      }
    }
  }
`;



