import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from 'constants/routes';
import { Button } from 'antd';

const PasswordForgetLink = ({changeMode}) => (
  <Button onClick={() => changeMode('forgetpassword')}>Forgot Password?</Button>
  // <p>
  //     <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  // </p>
);

export default PasswordForgetLink;
