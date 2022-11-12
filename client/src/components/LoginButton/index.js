import React from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Stack from 'react-bootstrap/Stack';


function LoginButton() {
  return (
<Stack gap={2} className="col-md-5 mx-auto">
<Link to="/login">
            <Button variant="secondary" className="m-2" size="lg">
              Login
            </Button>
          </Link>

          <Link to="/signup">
            <Button variant="secondary" className="m-2" size="lg">
              Signup
            </Button>
          </Link>
          </Stack>
          )
}

export default LoginButton;