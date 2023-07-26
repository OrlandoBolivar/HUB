import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Login from "./components/Auth/Login.js"
import Register from "./components/Auth/Register.js"
import UserPage from "./pages/UserPage.js"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '', // Add the token to the headers
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});



function App() {
  return (
    <ApolloProvider client={client}>
      <Router>

        <Routes>
          <Route
            path="/"
            element={<Login />}
          />
          <Route
            path="/register"
            element={<Register />}
          />
           <Route
            path="/user"
            element={<UserPage />}
          />
          <Route
            path='*'
            element={<h1 className="display-2">Wrong page!</h1>}
          />
        </Routes>

      </Router>
      <ToastContainer />
    </ApolloProvider>
  );
}

export default App;
