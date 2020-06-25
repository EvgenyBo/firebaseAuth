import React from 'react';

const SocialLoginLink = ({
	onlyOneLeft,
	isEnabled,
	signInMethod,
	onUnlink,
	onSocialLoginLink,
}) => isEnabled ? (
	<button
		type='button'
		onClick={() => onUnlink(signInMethod.id)}
		disabled={onlyOneLeft}>
		Deactivate {signInMethod.id}
	</button>
) : (
			<button
				type='button'
				onClick={() => onSocialLoginLink(signInMethod.provider)}>
				Link {signInMethod.id}
			</button>
		);

export default SocialLoginLink;
