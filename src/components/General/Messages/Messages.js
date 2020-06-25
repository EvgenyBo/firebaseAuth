import React, { Component } from 'react';
import { withFirebase } from 'components/HOC/Firebase';
import MessageList from 'components/General/Messages/MessageList';
import { withUser } from 'components/HOC/Session';
import { compose } from 'recompose';

class MessagesBase extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: '',
			loading: false,
			messages: [],
			limit: 5,
		};
	}
	componentDidMount() {
		this.onListenForMessages();
	}

	onListenForMessages = () => {
		this.setState({ loading: true });
		this.unsubscribe = this.props.firebase
			.messages()
			.orderBy('createdAt', 'desc')
			.limit(this.state.limit)
			.onSnapshot(snapshot => {
				if (snapshot.size) {
					let messages = [];
					snapshot.forEach(doc =>
						messages.push({ ...doc.data(), uid: doc.id }),
					);
					this.setState({
						messages: messages.reverse(),
						loading: false,
					});
				} else {
					this.setState({ messages: null, loading: false });
				}
				this.setState({ loading: false });
			});
	};

	componentWillUnmount() {
		this.unsubscribe();
	}

	onChangeText = event => {
		this.setState({ text: event.target.value });
	};

	onCreateMessage = (event, authUser) => {
		console.log('object', event)
		this.props.firebase
			.messages()
			.add({
				text: this.state.text,
				userId: authUser.uid,
				createdAt: this.props.firebase.fieldValue.serverTimestamp(),
			})
			.then(function(docRef) {
				console.log('Document written with ID: ', docRef.id);
			})
			.catch(function(error) {
				console.error('Error adding document: ', error);
			});
		this.setState({ text: '' });
		event.preventDefault();
	};

	onRemoveMessage = uid => {
		this.props.firebase.message(uid).remove();
	};

	onEditMessage = (message, text) => {
		this.props.firebase.message(message.uid).set({
			...message,
			text,
			editedAt: this.props.firebase.fieldValue.serverTimestamp(),
		});
	};

	onNextPage = () => {
		this.setState(
			prevState => ({ limit: prevState.limit + 5 }),
			this.onListenForMessages,
		);
	};

	render() {
		const { messages, loading, text } = this.state;
		const { authUser, users } = this.props;
		return (
			<div>
				{!loading && messages && (
					<button type='button' onClick={this.onNextPage}>
						More
					</button>
				)}
				{loading && <div>Loading ...</div>}
				{messages ? (
					<MessageList
						onEditMessage={this.onEditMessage}
						onRemoveMessage={this.onRemoveMessage}
						messages={messages.map(message => ({
							...message,
							user: users ? users[message.userId] : { userId: message.userId },
						}))}
					/>
				) : (
					<div>There are no messages ...</div>
				)}

				<form onSubmit={event => this.onCreateMessage(event, authUser)}>
					<input type='text' value={text} onChange={this.onChangeText} />
					<button type='submit'>Send</button>
				</form>
			</div>
		);
	}
}

const Messages = compose(
	withUser,
	withFirebase,
)(MessagesBase);

export default Messages;
