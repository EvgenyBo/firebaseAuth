import React from 'react';
import { AuthUserContext } from 'components/HOC/Session';

export const withUser = Component => props => (
	<AuthUserContext.Consumer>
		{authUser => <Component {...props} authUser={authUser} />}
	</AuthUserContext.Consumer>
);
