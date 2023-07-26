import React from 'react';
import LogIn from '../Auth/Login';
import {
  Jumbotron,
  Container,
  CardColumns,
  Card,
  Button,
} from 'react-bootstrap';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { REMOVE_COFFEE } from '../../utils/mutations';
import { removeCoffeeId } from '../utils/localStorage';

import Auth from '../../utils/auth';

const SavedCoffees = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const [removeCoffee, { error }] = useMutation(REMOVE_COFFEE);

  const userData = data?.me || {};

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (coffeeId) => {
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removeCoffee({
        variables: { coffeeId },
      });

      // upon success, remove book's id from localStorage
      removeCoffeeId(coffeeId);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Viewing {userData.username}'s books!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedCoffees?.length
            ? `Viewing ${userData.savedCoffees.length} saved ${
                userData.savedCoffees.length === 1 ? 'coffee' : 'coffees'
              }:`
            : 'You have no saved coffees!'}
        </h2>
        <CardColumns>
          {userData.savedCoffees?.map((coffee) => {
            return (
              <Card key={coffee.coffeeId} border="dark">
                <Card.Body>
                  <Card.Title>{coffee.typeOfCoffee}</Card.Title>
                  <p className="small">Authors: {coffee.typeOfMilk}</p>
                  <Card.Text>{coffee.typeMilk}</Card.Text>
                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleDeleteBook(coffee.coffeeId)}
                  >
                    Delete this Coffee!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedCoffees;