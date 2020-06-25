import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from 'components/HOC/Firebase';
import * as ROUTES from 'constants/routes';
import * as ERRORS from 'constants/errors';

class SignInFacebookBase extends Component {
	constructor(props) {
		super(props);
		this.state = { error: null };
	}

	onSubmit = event => {
		this.props.firebase
			.doSignInWithFacebook()
			.then(socialAuthUser => {
				// Create a user in your Firebase Realtime Database too
				//if (socialAuthUser.additionalUserInfo.isNewUser) {
				return this.props.firebase.user(socialAuthUser.user.uid).set(
					{
						username: socialAuthUser.additionalUserInfo.profile.name,
						email: socialAuthUser.additionalUserInfo.profile.email
							? socialAuthUser.additionalUserInfo.profile.email
							: null,
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
				<button type='submit'>Sign In with Facebook</button>
				{error && <p>{error.message}</p>}
			</form>
		);
	}
}

const SignInFacebook = compose(
	withRouter,
	withFirebase,
)(SignInFacebookBase);

export default SignInFacebook;
