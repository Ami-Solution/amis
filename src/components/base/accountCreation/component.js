import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ProfileActions from '../../../actions/profile';
import HeaderStep from '../headerStep/component';
import StepsAsideComponent from '../fiveStepsAside/component';
import AccountCreationForm from './formComponent';

class AccountCreationComponent extends Component {

  render() {
    return (
      <div className="main">
        <div className="shell">
          <section className="section section-form section-form-secondary">
            <h5 className="section-title">Create a Policy</h5>
            <div className="section-inner">
              <HeaderStep currenStep={2} />
              <div className="section-body">
                <div className="section-group section-group-secondary">
                  <AccountCreationForm
                    identityUser={this.props.identityUser}
                    accountCreate={this.props.accountCreate}
                    clearIdentity={this.props.clearIdentity}
                    isFetched={this.props.isFetched}
                  />
                  <StepsAsideComponent
                    body={
                      <p>
                        <span>
                          Hey, BTW, If you close your browser during this process
                        </span> and come back to it later. We’ll remember right where you left off.
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

AccountCreationComponent.propTypes = {
  accountCreate: PropTypes.func.isRequired,
  clearIdentity: PropTypes.func.isRequired,
  identityUser: PropTypes.object.isRequired,
  isFetched: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    identityUser: state.profile.identityUser,
    isFetched: state.profile.isFetched
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ProfileActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountCreationComponent);
