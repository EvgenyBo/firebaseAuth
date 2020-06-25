import React from 'react';
import PasswordForgetLink from 'components/Pages/PasswordForget/PasswordForgetLink';
import PasswordForgetForm from 'components/Pages/PasswordForget/PasswordForgetForm';

const PasswordForgetPage = () => (
  <div>
    <h1>PasswordForget</h1>
    <PasswordForgetForm />
  </div>
);

export default PasswordForgetPage;

export { PasswordForgetForm, PasswordForgetLink };