import React from 'react';
import { withFirebase } from '../Firebase';
import { withUser } from 'components/HOC/Session';
import { compose } from 'recompose';

const needsEmailVerification = authUser =>
	authUser &&
	!authUser.emailVerified &&
	authUser.providerData
		.map(provider => provider.providerId)
		.includes('password');

const withEmailVerification = Component => {
	class WithEmailVerification extends React.Component {
		constructor(props) {
			super(props);
			this.state = { isSent: false };
		}

		onSendEmailVerification = () => {
			this.props.firebase
				.doSendEmailVerification()
				.then(() => this.setState({ isSent: true }));
		};

		render() {
			const { authUser } = this.props;

			return needsEmailVerification(authUser) ? (
				<div>
					{this.state.isSent ? (
						<p>
							E-Mail confirmation sent: Check you E-Mails (Spam folder included)
							for a confirmation E-Mail. Refresh this page once you confirmed
							your E-Mail.
						</p>
					) : (
						<p>
							Verify your E-Mail: Check you E-Mails (Spam folder included) for a
							confirmation E-Mail or send another confirmation E-Mail.
						</p>
					)}
					<button
						type='button'
						onClick={this.onSendEmailVerification}
						disabled={this.state.isSent}>
						Send confirmation E-Mail
					</button>
				</div>
			) : (
				<Component {...this.props} />
			);
		}
	}
	return compose(
		withFirebase,
		withUser,
	)(WithEmailVerification);
};
export default withEmailVerification;
