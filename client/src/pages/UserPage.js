import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import AuthService from '../utils/auth';
import { Navigate } from 'react-router-dom';
import CoffeeForm from '../components/Coffee/CoffeeForm';

const UserPage = () => {
  const isAuthenticated = AuthService.loggedIn();
  const [userData, setUserData] = useState(null);
  const { loading, error, data } = useQuery(QUERY_ME);

  useEffect(() => {
    if (isAuthenticated) {
      if (data) {
        setUserData(data.me);
      }
    }
  }, [isAuthenticated, data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.log(error);
    return <Navigate to="/" />;
  }

  const user = userData;


  return (
    <div>
      {isAuthenticated ? (
        <>
          <h1>User Page</h1>
          {user && (
            <>
              <p>Welcome {user.username}</p>
              <CoffeeForm/>
            </>
          )}
        </>
      ) : (
        <Navigate to="/" />
      )}
    </div>
  );
};

export default UserPage;
