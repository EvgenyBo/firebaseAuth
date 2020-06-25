import React from 'react';
import SignUpLink from 'components/Pages/SignUp/SignUpLink';
import SignInForm from 'components/Pages/SignIn/SignInFrom';
import PasswordForgetLink from 'components/Pages/PasswordForget/PasswordForgetLink';
import SignInGoogle from 'components/Pages/SignIn/SignInGoogleForm';
import SignInFacebook from 'components/Pages/SignIn/SignInFaceBookForm';

const SignInPage = ({ changeMode }) => (
  <div>
    <h1>SignIn</h1>
    <SignInForm />
    <SignInGoogle />
    <SignInFacebook />
    <SignUpLink changeMode={changeMode} />
    <PasswordForgetLink changeMode={changeMode}/>
  </div>
);

export default SignInPage;
