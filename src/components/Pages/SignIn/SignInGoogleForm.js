import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from 'components/HOC/Firebase';
import * as ROUTES from 'constants/routes';
import * as ERRORS from 'constants/errors';

class SignInGoogleBase extends Component {
	constructor(props) {
		super(props);
		this.state = { error: null };
	}

	onSubmit = event => {
		this.props.firebase
			.doSignInWithGoogle()
			.then(socialAuthUser => {
				// Create a user in your Firebase Realtime Database too
				return this.props.firebase.user(socialAuthUser.user.uid).set(
					{
						username: socialAuthUser.user.displayName,
						email: socialAuthUser.user.email,
						roles: [],
					},
					{ merge: true },
				);
			})
			.then(socialAuthUser => {
				this.setState({ error: null });
				this.props.history.push(ROUTES.HOME);
			})
			.catch(error => {
				if (error.code === ERRORS.ERROR_CODE_ACCOUNT_EXISTS) {
					error.message = ERRORS.ERROR_MSG_ACCOUNT_EXISTS;
				}
				this.setState({ error });
			});
		event.preventDefault();
	};

	render() {
		const { error } = this.state;
		return (
			<form onSubmit={this.onSubmit}>
				<button type='submit'>Sign In with Google</button>
				{error && <p>{error.message}</p>}
			</form>
		);
	}
}

const SignInGoogle = compose(
	withRouter,
	withFirebase,
)(SignInGoogleBase);

export default SignInGoogle;
