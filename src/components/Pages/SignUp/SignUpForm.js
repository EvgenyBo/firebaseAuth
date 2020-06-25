import React, { Component } from 'react';
import * as ROUTES from 'constants/routes';
import { withFirebase } from 'components/HOC/Firebase';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import * as ROLES from 'constants/roles';
import * as ERRORS from 'constants/errors';

const INITIAL_STATE = {
	username: '',
	email: '',
	isAdmin: false,
	passwordOne: '',
	passwordTwo: '',
	error: null,
};
class SignUpFormBase extends Component {
	constructor(props) {
		super(props);
		this.state = { ...INITIAL_STATE };
	}

	onSubmit = event => {
		const { email, passwordOne, username, isAdmin } = this.state;
		let roles = [];
		if (isAdmin) {
			roles.push(ROLES.ADMIN);
		}
		this.props.firebase
			.doCreateUserWithEmailAndPassword(email, passwordOne)
			.then(authUser => {
				console.log('userAuth', authUser);
				// Create a user in your Firebase realtime database
				return this.props.firebase.user(authUser.user.uid).set(
					{
						username,
						email,
						roles,
					},
					{ merge: true },
				);
			})
			.then(() => {
				return this.props.firebase.doSendEmailVerification();
			})
			.then(authUser => {
				console.log('userDB', authUser);
				this.setState({ ...INITIAL_STATE });
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

	onChange = event => {
		const setValue =
			event.target.type === 'checkbox'
				? event.target.checked
				: event.target.value;
		this.setState({ [event.target.name]: setValue });
	};

	render() {
		const {
			username,
			email,
			isAdmin,
			passwordOne,
			passwordTwo,
			error,
		} = this.state;

		const isInvalid =
			passwordOne !== passwordTwo ||
			passwordOne === '' ||
			email === '' ||
			username === '';

		return (
			<form onSubmit={this.onSubmit}>
				<input
					name='username'
					value={username}
					onChange={this.onChange}
					type='text'
					placeholder='Full Name'
				/>
				<input
					name='email'
					value={email}
					onChange={this.onChange}
					type='text'
					placeholder='Email Address'
				/>
				<input
					name='passwordOne'
					value={passwordOne}
					onChange={this.onChange}
					type='password'
					placeholder='Password'
				/>
				<input
					name='passwordTwo'
					value={passwordTwo}
					onChange={this.onChange}
					type='password'
					placeholder='Confirm Password'
				/>
				<button disabled={isInvalid} type='submit'>
					Sign Up
				</button>
				<label>
					Admin:
					<input
						name='isAdmin'
						type='checkbox'
						value={isAdmin}
						checked={isAdmin}
						onChange={this.onChange}
					/>
				</label>
				{error && <p>{error.message}</p>}
			</form>
		);
	}
}

const SignUpForm = compose(
	withRouter,
	withFirebase,
)(SignUpFormBase);

export default SignUpForm;
