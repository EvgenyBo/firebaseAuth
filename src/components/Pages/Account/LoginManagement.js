import React, { Component } from 'react';
import { withFirebase } from 'components/HOC/Firebase';
import SocialLoginLink from 'components/Pages/Account/SocialLoginLink';
import DefaultLoginLink from 'components/Pages/Account/DefaultLoginLink'

const SIGN_IN_METHODS = [
	{
		id: 'password',
		provider: null,
	},
	{
		id: 'google.com',
		provider: 'googleProvider',
	},
	{
		id: 'facebook.com',
		provider: 'facebookProvider',
	},
	// {
	//     id: 'twitter.com',
	//     provider: 'twitterProvider',
	// },
];

class LoginManagementBase extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeSignInMethods: [],
			error: null,
		};
	}

	componentDidMount() {
		this.fetchSignInMethods();
	}

	fetchSignInMethods = () => {
		this.props.firebase.auth
			.fetchSignInMethodsForEmail(this.props.authUser.email)
			.then(activeSignInMethods =>
				this.setState({ activeSignInMethods, error: null }),
			)
			.catch(error => this.setState({ error }));
	};

	onSocialLoginLink = provider => {
		this.props.firebase.auth.currentUser
			.linkWithPopup(this.props.firebase[provider])
			.then(this.fetchSignInMethods)
			.catch(error => this.setState({ error }));
	};

	onDefaultLoginLink = password => {
		const credential = this.props.firebase.emailAuthProvider.credential(
			this.props.authUser.email,
			password,
		);
		this.props.firebase.auth.currentUser
			.linkAndRetrieveDataWithCredential(credential)
			.then(this.fetchSignInMethods)
			.catch(error => this.setState({ error }));
	};

	onUnlink = providerId => {
		this.props.firebase.auth.currentUser
			.unlink(providerId)
			.then(this.fetchSignInMethods)
			.catch(error => this.setState({ error }));
	};

	render() {
		const { activeSignInMethods, error } = this.state;

		return (
			<div>
				Sign In Methods:
				<ul>
					{SIGN_IN_METHODS.map(signInMethod => {
						const onlyOneLeft = activeSignInMethods.length === 1;
						const isEnabled = activeSignInMethods.includes(signInMethod.id);
						return (
							<li key={signInMethod.id}>
								{signInMethod.id === 'password' ? (
									<DefaultLoginLink
										onlyOneLeft={onlyOneLeft}
										isEnabled={isEnabled}
										signInMethod={signInMethod}
										onDefaultLoginLink={this.onDefaultLoginLink}
										onUnlink={this.onUnlink}
									/>
								) : (
									<SocialLoginLink
										onlyOneLeft={onlyOneLeft}
										isEnabled={isEnabled}
										signInMethod={signInMethod}
										onSocialLoginLink={this.onSocialLoginLink}
										onUnlink={this.onUnlink}
									/>
								)}
							</li>
						);
					})}
				</ul>
				{error && error.message}
			</div>
		);
	}
}

const LoginManagement = withFirebase(LoginManagementBase);

export default LoginManagement;
