import { withFirebase } from 'components/HOC/Firebase';
import { compose } from 'recompose';
import * as ROUTES from 'constants/routes';
import { withRouter } from 'react-router-dom';
import React, { PureComponent } from 'react';

export class SignOutButtonBase extends PureComponent {

  handleClick = () => {
    const { history } = this.props;
    this.props.firebase.doSignOut()
    history.push(ROUTES.SIGN_IN);
}

render() {

  return (
    <button type="button" onClick={this.handleClick}>
      Sign Out
      </button>
  )
}
}

const SignOutButton = compose(
  withRouter,
  withFirebase,
)(SignOutButtonBase);

export default SignOutButton;