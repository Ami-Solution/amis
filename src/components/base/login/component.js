import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ProfileActions from '../../../actions/profile';
import LoginForm from './formComponent';
import StepsAsideComponent from '../fiveStepsAside/component';

class LoginComponent extends Component {
  render() {
    return (
      <div className="main">
        <div className="shell">
          <section className="section section-form section-form-secondary">
            <h5 className="section-title">Login</h5>
            <div className="section-inner">
              <div className="section-body">
                <div className="section-group section-group-primary">
                  <div className="section-content">
                    <div className="form form-account">
                      <LoginForm
                        login={this.props.login}
                        isFetched={this.props.isFetched}
                        isRelogin={this.props.isRelogin}
                      />
                    </div>
                  </div>
                  <StepsAsideComponent
                    body={
                      <p>
                        <span>Dynamis - Peer to peer insurance</span> - Using Ethereum
                        to build the next generation of financial apps running on the blockchain
                      </p>}
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

LoginComponent.propTypes = {
  login: PropTypes.func.isRequired,
  isFetched: PropTypes.bool.isRequired,
  isRelogin: PropTypes.bool.isRequired
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ProfileActions, dispatch);
}
function mapStateToProps(state) {
  return {
    isRelogin: state.profile.isRelogin,
    isFetched: state.profile.isFetched
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
