import React from 'react';
import MessageItem from 'components/General/Messages/MessageItem';

const MessageList = ({ messages, onRemoveMessage, onEditMessage }) => (
	<ul>
		{messages.map(message => {
			return (
			<MessageItem
				onRemoveMessage={onRemoveMessage}
				onEditMessage={onEditMessage}
				key={message.uid}
				message={message}
			/>
		)})}
	</ul>
);

export default MessageList;
