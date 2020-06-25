import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navigation from 'components/Navigation';
import LandingPage from 'components/Pages/Landing';
import SignUpPage from 'components/Pages/SignUp';
import SignInPage from 'components/Pages/SignIn';
import PasswordForgetPage from 'components/Pages/PasswordForget';
import HomePage from 'components/Pages/Home';
import AccountPage from 'components/Pages/Account';
import AdminPage from 'components/Pages/Admin';
import * as ROUTES from 'constants/routes';
import styles from './App.module.scss';
import { withAuthentication } from 'components/HOC/Session';

const App = () => (
	<Router>
		<div className={styles.container}>
			<Navigation />
			<hr />
			<Route exact path={ROUTES.LANDING} component={LandingPage} />
			<Route path={ROUTES.SIGN_UP} component={SignUpPage} />
			<Route path={ROUTES.SIGN_IN} component={SignInPage} />
			<Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
			<Route path={ROUTES.HOME} component={HomePage} />
			<Route path={ROUTES.ACCOUNT} component={AccountPage} />
			<Route path={ROUTES.ADMIN} component={AdminPage} />
		</div>
	</Router>
);

export default withAuthentication(App);
