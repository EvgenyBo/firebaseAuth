import React from 'react';
import PasswordForgetForm from 'components/Pages/PasswordForget/PasswordForgetForm';
import PasswordChangeForm from 'components/Pages/PasswordForget/PasswordChangeForm';
import { withAuthorization, withUser, withEmailVerification } from 'components/HOC/Session';
import { compose } from 'recompose';
import LoginManagement from 'components/Pages/Account/LoginManagement'

const AccountPage = ({ authUser }) => (
  <div>
    <h1>Account: {authUser.email}</h1>
    <PasswordForgetForm />
    <PasswordChangeForm />
    <LoginManagement authUser={authUser} />
  </div>
);

const condition = authUser => !!authUser;

export default compose(
  withAuthorization(condition),
  withUser,
  withEmailVerification,
)(AccountPage);