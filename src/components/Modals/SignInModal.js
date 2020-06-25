import { Modal, Button } from 'antd';

class SignInModal extends React.Component {


  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Open Modal with async logic
        </Button>
      </div>
    );
  }
}

export default SignInModal;