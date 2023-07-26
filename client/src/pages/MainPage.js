import React, { useState, useEffect } from 'react';
import {
  Jumbotron,
  Container,
  Col,
  Form,
  Button,
  Card,
  CardColumns,
  Image,
} from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { Login } from '../components/Auth/Login'
import { SAVE_COFFEE } from '../utils/mutations';
import { saveCoffeeIds, getSavedCoffeeIds } from '../utils/auth';

import Auth from '../utils/auth';

// set up useEffect hook to save `savedBookIds` list to localStorage on component unmount
// learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
useEffect(() => {
  return () => Ids(savedCoffeeIds);
});


// create function to handle saving a book to our database
const handleSaveCoffee = async (coffeeId) => {
  // find the book in `searchedBooks` state by the matching id
  const bookToSave = searchedBooks.find((book) => book.bookId === bookId);

  // get token
  const token = Auth.loggedIn() ? Auth.getToken() : null;

  if (!token) {
    return false;
  }

  try {
    const { data } = await saveCoffee({
      variables: { bookData: { ...bookToSave } },
    });
    console.log(savedBookIds);
    setSavedBookIds([...savedBookIds, bookToSave.bookId]);
  } catch (err) {
    console.error(err);
  }

  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>HUB AUSTRALIA</h1>
          <Image src="" fluid />
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Become a loyalty HUB HYDE PARK member!!
              </Card.Text>
            </Card.Body>
          </Card>

          <Card style={{ width: '18rem' }}></Card>
          <Card.Body>
            <Card.Title>Sign In </Card.Title>
            <Form onSubmit={handleFormSubmit}>
              <Form.Row>
                <Col xs={12} md={8}>
                  <Login
                  />
                </Col>
              </Form.Row>
            </Form>
          </Card.Body>
        </Container>
      </Jumbotron>
    </>
  );
};

export default SearchBooks;