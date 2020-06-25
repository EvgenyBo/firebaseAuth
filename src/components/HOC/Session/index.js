import React from 'react';
import withAuthentication from 'components/HOC/Session/withAuthentication';
import withAuthorization from 'components/HOC/Session/withAuthorization';
import { withUser } from 'components/HOC/Session/withUser';
import withEmailVerification from './withEmailVerification';

const AuthUserContext = React.createContext(null);

export {
	AuthUserContext,
	withAuthentication,
	withAuthorization,
	withUser,
	withEmailVerification,
};
