import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import CardGroup from 'react-bootstrap/CardGroup';

import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
     <>
     <Alert key="warning" variant="warning">
         This is a warning  You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
       </Alert>
 
   </>

    );
  }

  return (
 

    <Card border="light" style={{ width: 'auto' }}>
    <Card.Header>Viewing {userParam ? `${user.username}'s` : 'your'} profile.</Card.Header>
    <Card.Body>
      <Card.Img>{user.photo}</Card.Img>
      <Card.Title>{user.username}</Card.Title>
    </Card.Body>
    <Card.Body>
      <Card.Text>
        
       User details go here
      </Card.Text>
        <Button>A button</Button>
    </Card.Body>
  <CardGroup>
    <Card border="light" style={{ width: 'auto' }}>
    <Card.Header>My Tos</Card.Header>
    </Card>
    <Card border="light" style={{ width: 'auto' }}>
    <Card.Header>My Dos</Card.Header>
    </Card>
  </CardGroup>
  </Card>

  );
};

export default Profile;
