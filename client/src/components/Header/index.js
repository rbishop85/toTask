import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import "./navbar.css"

import Auth from "../../utils/auth";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
    window.location.replace("/")
  };
  return (
    <header className="bg-secondary text-light mb-4 py-1 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
       <Nav>
        <Link to="/">
        <img
          alt="toTask Logo"
          src="./assets/images/toTask.svg"
          width="180px"
          height="80px"
        />
        </Link>
       </Nav>
        <Nav className="justify-content-end" activeKey="/home">
          {Auth.loggedIn() ? (
            <>
              <Nav.Item>
                <Link to="/me">
                  <Button variant="primary" className="m-2" size="lg">
                    {Auth.getProfile().data.username}'s profile
                  </Button>
                </Link>

                <Link to="/tasks">
                  <Button variant="primary" className="m-2" size="lg">
                    Tasks
                  </Button>
                </Link>

                <Button variant="primary" className="m-2" size="lg" onClick={logout}>
                  Logout
                </Button>
              </Nav.Item>
            </>
          ) : (
            <>
              <Nav.Item>
                <Link to="/login">
                  <Button variant="primary" className="m-2" size="lg">
                    Login
                  </Button>
                </Link>

                <Link to="/signup">
                  <Button variant="primary" className="m-2" size="lg">
                    Signup
                  </Button>
                </Link>
              </Nav.Item>
            </>
          )}
        </Nav>
      </div>
    </header>
  );
};

export default Header;
