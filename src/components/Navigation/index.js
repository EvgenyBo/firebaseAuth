import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from 'constants/routes';
import SignOutButton from 'components/General/Buttons/SignOutButton';
import { withUser } from 'components/HOC/Session';
import * as ROLES from 'constants/roles';
import styles from './Navigation.module.scss';
import { Modal, Button } from 'antd';
import SignInPage from 'components/Pages/SignIn';
import SignUp from 'components/Pages/SignUp';
import PasswordForgetPage from 'components/Pages/PasswordForget';

const Navigation = ({ authUser }) => {
  return (
    <div>
      {authUser ? (
        <NavigationAuth authUser={authUser} />
      ) : (
        <NavigationNonAuth />
      )}
    </div>
  );
};

const NavigationAuth = ({ authUser }) => {
  console.log('authUser', authUser);
  return (
    <ul className={styles.list}>
      <li>
        <Link to={ROUTES.LANDING}>Landing</Link>
      </li>
      <li>
        <Link to={ROUTES.HOME}>Home</Link>
      </li>
      <li>
        <Link to={ROUTES.ACCOUNT}>Account</Link>
      </li>
      {authUser.roles.includes(ROLES.ADMIN) && (
        <li>
          <Link to={ROUTES.ADMIN}>Admin</Link>
        </li>
      )}
      <li>
        <SignOutButton />
      </li>
    </ul>
  );
};

class NavigationNonAuth extends Component {
  state = {
    visible: false,
    confirmLoading: false,
    mode: 'signin'
  };

  openLoginModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = () => {
    this.setState({
      confirmLoading: true
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false
      });
    }, 2000);
  };

  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
      mode: 'signin'
    });
  };

  changeMode = (mode) => {
    console.log(mode, 'sign mode');
    this.setState({
      mode
    });
  };

  render() {
    const { visible, confirmLoading, mode } = this.state;

    return (
      <ul className={styles.list}>
        <li>
          <Button type="primary" onClick={this.openLoginModal}>
            Login
          </Button>
        </li>
        <Modal
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}>
          {(() => {
            switch (mode) {
              case 'signin':
                return (
                  <SignInPage changeMode={(mode) => this.changeMode(mode)} />
                );
              case 'signup':
                return <SignUp changeMode={(mode) => this.changeMode(mode)} />;
              case 'forgetpassword':
                return (
                  <PasswordForgetPage
                    changeMode={(mode) => this.changeMode(mode)}
                  />
                );
              default:
                return null;
            }
          })()}
        </Modal>
        <li>
          <Link to={ROUTES.LANDING}>Landing</Link>
        </li>
      </ul>
    );
  }
}

export default withUser(Navigation);
