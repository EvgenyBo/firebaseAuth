import * as ROUTES from 'constants/routes';
import { Link } from 'react-router-dom';
import React from 'react';
import { Button } from 'antd';

const SignUpLink = ({ changeMode }) => (
  <Button onClick={() => changeMode('signup')}>
    SignUp
    {/* Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link> */}
  </Button>
);

export default SignUpLink;