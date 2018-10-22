import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ProfileActions from '../../../actions/profile';
import HeaderStep from '../headerStep/component';
import IdentityForm from './formComponent';
import StepsAsideComponent from '../fiveStepsAside/component';

class IdentityComponent extends Component {

  render() {
    return (
      <div className="main">
        <div className="shell">
          <section className="section section-form">
            <h5 className="section-title">Create a Policy</h5>
            <div className="section-inner">
              <HeaderStep currenStep={1} />
              <div className="section-body">
                <div className="section-group section-group-primary">
                  <IdentityForm
                    identity={this.props.identity}
                    identityUser={this.props.identityUser}
                    isFetched={this.props.isFetched}
                  />
                  <StepsAsideComponent
                    body={
                      <p>
                        <span>5 easy steps.</span>
                        <br />
                        This will go quick.
                        <br />
                        Let’s get started!
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

IdentityComponent.propTypes = {
  identity: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(IdentityComponent);
