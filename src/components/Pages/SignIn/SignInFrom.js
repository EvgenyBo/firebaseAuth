import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from 'components/HOC/Firebase';
import * as ROUTES from 'constants/routes';
import * as ERRORS from 'constants/errors';

const INITIAL_STATE = {
	email: '',
	password: '',
	error: null,
};
class SignInFormBase extends Component {
	constructor(props) {
		super(props);
		this.state = { ...INITIAL_STATE };
	}

	onSubmit = event => {
		const { email, password } = this.state;
		this.props.firebase
			.doSignInWithEmailAndPassword(email, password)
			.then(() => {
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
		this.setState({ [event.target.name]: event.target.value });
	};

	render() {
		const { email, password, error } = this.state;
		const isInvalid = password === '' || email === '';

		return (
			<form onSubmit={this.onSubmit}>
				<input name="email" value={email} onChange={this.onChange} type="text" placeholder="Email Address" />
				<input name="password" value={password} onChange={this.onChange} type="password" placeholder="Password" />
				<button disabled={isInvalid} type="submit">
					Sign In
				</button>
				{error && <p>{error.message}</p>}
			</form>
		);
	}
}

const SignInForm = compose(
	withFirebase,
	withRouter,
)(SignInFormBase);

export default SignInForm;
