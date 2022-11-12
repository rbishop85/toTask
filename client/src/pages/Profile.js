import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import CardGroup from "react-bootstrap/CardGroup";
import TaskAccordion from "../components/TaskAccordion"

import { QUERY_USER, QUERY_ME } from "../utils/queries";
import { ADD_PHOTO } from '../utils/mutations';

import Auth from "../utils/auth";

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dvz8fgb8h/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'csb18uju';

const Profile = () => {
  const { username: userParam } = useParams();

  const [updateUserPhoto, { error }] = useMutation(ADD_PHOTO);
  
  const addPhoto = async ( url ) => {
    
    try {
      await updateUserPhoto({
        variables: { photoUrl: url },
      });

      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  }

  const hiddenFileInput = React.useRef(null);
  const handleClick = event => {
    hiddenFileInput.current.click();
  };
  const handleChange = async (event) => {
    const fileUploaded = event.target.files[0];

    const formData = new FormData();
    formData.append('file', fileUploaded);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  
    fetch(CLOUDINARY_URL, {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then((data) => {
        if (data.secure_url !== '') {
          addPhoto(data.secure_url);
        }
      })
      .catch(err => console.error(err));

  };

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

  // if (!user?.username) {
  //   return (
  //    <>
  //    <Alert key="warning" variant="warning">
  //        This is a warning  You need to be logged in to see this. Use the navigation links above to
  //       sign up or log in!
  //      </Alert>

  //  </>

  //   );
  // }



  return (
    <>
      {Auth.loggedIn() ? (
        <div>
        <Card border="light" style={{ width: "auto" }}>
          <Card.Header>
            Viewing {userParam ? `${user.username}'s` : "your"} profile.
          </Card.Header>
          <Card.Body>
            {/* <Card.Img>{user.photo}</Card.Img> */}
            <Card.Title>{user.username}</Card.Title>
            {/* {!user.photo && <Button>upload profile image</Button>}
            {user.photo && <Button>change profile image</Button>} */}
            <Button onClick={handleClick}>
              {user.photo ? ( "change" ) : ( "upload" )} profile image
            </Button>
            <input type="file" ref={hiddenFileInput} onChange={handleChange} style={{display:'none'}} />
          </Card.Body>
          <Card.Body>
            <Card.Text>{user.email}</Card.Text>
            <Card.Text>{user.rating}</Card.Text>
          </Card.Body>
          <CardGroup>
            <Card border="light" style={{ width: "auto" }}>
              <Card.Header>My Tos</Card.Header>
              
              <TaskAccordion 
                tasks={user.tasksPosted}
              />
            </Card>
            <Card border="light" style={{ width: "auto" }}>
              <Card.Header>My Dos</Card.Header>
              <TaskAccordion
                tasks={user.tasksAssinged}
              />
            </Card>
          </CardGroup>
        </Card>
        </div>
      ) : (
        <Alert key="warning" variant="warning">
          This is a warning You need to be logged in to see this. Use the
          navigation links above to sign up or log in!
        </Alert>
      )}
    </>
  );
};

export default Profile;
