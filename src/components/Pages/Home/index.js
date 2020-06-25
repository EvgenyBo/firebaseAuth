import React, { Component } from 'react';
import {
	withAuthorization,
	withEmailVerification,
} from 'components/HOC/Session';
import { withFirebase } from 'components/HOC/Firebase';
import { compose } from 'recompose';
import Messages from 'components/General/Messages/Messages';

class HomePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: null,
		};
	}
	componentDidMount() {
		this.unsubscribe = this.props.firebase.users().onSnapshot(snapshot => {
			let users = {};
			snapshot.forEach(doc => (users[doc.id] = doc.data()));
			this.setState({
				users
			});
		});
	}
	componentWillUnmount() {
		this.unsubscribe();
	}

	render() {
		return (
			<div>
				<h1>Home Page</h1>
				<p>The Home Page is accessible by every signed in user.</p>

				<Messages users={this.state.users} />
			</div>
		);
	}
}

const condition = authUser => !!authUser;

export default compose(
	withFirebase,
	withAuthorization(condition),
	withEmailVerification,
)(HomePage);
