import React from 'react';
import UserList from 'components/General/Users/UserList';
import UserItem from 'components/General/Users/UserItem';
import { Switch, Route } from 'react-router-dom';
import {
	withAuthorization,
	withEmailVerification,
} from 'components/HOC/Session';
import { compose } from 'recompose';
import * as ROLES from 'constants/roles';
import * as ROUTES from 'constants/routes';

const AdminPage = () => (
	<div>
		<h1>Admin</h1>
		<p>The Admin Page is accessible by every signed in admin user.</p>
		<Switch>
			<Route exact path={ROUTES.ADMIN_DETAILS} component={UserItem} />
			<Route exact path={ROUTES.ADMIN} component={UserList} />
		</Switch>
	</div>
);

const condition = authUser => authUser && authUser.roles.includes(ROLES.ADMIN);

export default compose(
	withAuthorization(condition, ROUTES.HOME),
	withEmailVerification,
)(AdminPage);
