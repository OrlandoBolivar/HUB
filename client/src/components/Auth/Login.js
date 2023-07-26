import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Col } from 'react-bootstrap';

import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';

import Auth from '../../utils/auth';

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ username: '', pin: '' });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [login, { error }] = useMutation(LOGIN_USER);

  useEffect(() => {
    if (error) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [error]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await login({
        variables: { ...userFormData },
      });
      console.log(data);
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setUserFormData({
      username: '',
      pin: '',
    });
  };

  return (
    <>
    <h1>Login</h1>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Something went wrong with your login credentials!
        </Alert>
        <Form.Group>
          <Form.Label htmlFor="username">User Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your user name"
            name="user name"
            onChange={handleInputChange}
            value={userFormData.username}
            required
          />
          <Form.Control.Feedback type="invalid">
            Username is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="pin">Pin</Form.Label>
          <Form.Control
            type="pin"
            placeholder="Your pin"
            name="pin"
            onChange={handleInputChange}
            value={userFormData.pin}
            required
          />
          <Form.Control.Feedback type="invalid">
            Pin is required!
          </Form.Control.Feedback>
        </Form.Group>
          <Col xs={12} md={4}>
           <Button
          disabled={!(userFormData.username && userFormData.pin)}
          type="submit"
          variant="success"
             >
          Submit
          </Button>
         </Col>
      </Form>
    </>
  );
};

export default LoginForm;