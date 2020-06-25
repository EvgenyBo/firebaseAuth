import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import * as ROUTES from 'constants/routes';
import { withFirebase } from 'components/HOC/Firebase'
import { withUser } from 'components/HOC/Session';

const withAuthorization = (condition, route) => Component => {
    class WithAuthorization extends React.Component {

        componentDidMount() {
            this.listener = this.props.firebase.onAuthUserListener(authUser => {
                if (!condition(authUser)) {
                    const toRoute = route ? route : ROUTES.SIGN_IN
                    this.props.history.push(toRoute);
                }
            }, () => {
                this.props.history.push(ROUTES.SIGN_IN);
            });
        }

        componentWillUnmount() {
            this.listener();
        }

        render() {

            const { authUser } = this.props;

            const isComponent = condition(authUser) ? <Component {...this.props} /> : null

            return isComponent;
        }
    }

    return compose(
        withUser,
        withRouter,
        withFirebase,
    )(WithAuthorization);
};
export default withAuthorization;