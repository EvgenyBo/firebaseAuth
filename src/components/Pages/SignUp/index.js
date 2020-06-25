import React from 'react';
import { withFirebase } from 'components/HOC/Firebase';
import SignUpForm from 'components/Pages/SignUp/SignUpForm'


const SignUpPage = () => (
  <div>
    <h1>SignUp</h1>
    <SignUpForm />
  </div>
);

export default withFirebase(SignUpPage);