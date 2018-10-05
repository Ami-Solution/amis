import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
import { Modal } from 'react-bootstrap';

class UnsavedModal extends Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
  }

  componentDidMount() {
    this.props.router.setRouteLeaveHook(this.props.route, this.routerWillLeave);
  }

  routerWillLeave(nextLocation) {
    return 'Your work is not saved! Are you sure you want to leave?';
  }

  render() {
    const close = () => {
      this.setState({ show: false });
    };
    return (
      <Modal
        show={this.state.show}
        onHide={close}
      >
        <Modal.Header closeButton />
      'You have unsaved information, are you sure you want to leave this page?'
      </Modal>
    );
  }
}

UnsavedModal.propTypes = {
  router: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired
};

export default withRouter(UnsavedModal);
