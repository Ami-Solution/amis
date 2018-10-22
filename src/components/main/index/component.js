import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ProfileActions from '../../../actions/profile';
import StepsAsideComponent from '../../base/fiveStepsAside/component';
import HeaderStep from '../../base/headerStep/component';

import { urls } from '../../../routes';

class MainIndexComponent extends Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.keybase_username && !this.props.user.keybase_username) {
      this.props.identity(nextProps.user.keybase_username);
    }
  }

  render() {
    const handleNextButton = () => {
      browserHistory.push(urls.main.historyForm1.path);
    };
    const { identityUser, user } = this.props;
    return (
      <section className="section section-form">
        <h5 className="section-title">Create a Policy</h5>
        <div className="section-inner">
          <HeaderStep currenStep={2} />
          <div className="section-body">
            <div className="section-group section-group-secondary">
              <div className="user">
                <div className="user-head">
                  <h2>
                    <i className="ico-check-secondary" />

                    Online Identity
                  </h2>
                </div>
                {identityUser ?
                  <div className="user-body">
                    <a
                      href={`http://www.keybase.io/${identityUser.username}`}
                      target="_blank"
                    >
                      <span>
                        <img
                          alt="avatar"
                          src={identityUser.avatarPath}
                          width="39" height="39"
                        />
                      </span>
                      <small>{identityUser.username}</small>
                    </a>
                  </div> : null
                }
              </div>
              <div className="section-content">
                <div className="account">
                  <div className="account-head">
                    <h2>
                      <i className="ico-check-secondary" />

                      Account
                    </h2>
                  </div>
                  
                  <div className="account-body">
                    <table className="table-account">
                      <tbody>
                      <tr>
                        <td>Username:</td>

                        <td>
                          <span>{user.email}</span>
                        </td>
                      </tr>
                      
                      <tr>
                        <td>Password:</td>

                        <td>
                          <span>•••••••••••••</span>
                        </td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="form-actions">
                    <button
                      type="submit" className="btn btn-blue btn-big"
                      onClick={handleNextButton}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
              <StepsAsideComponent
                body={
                  <p>
                    <span>Hey, BTW, If you close your browser during this process</span> and
                    come back to it later. We’ll remember right where you left off.
                  </p>}
              />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

MainIndexComponent.propTypes = {
  identity: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  identityUser: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.profile.user,
    identityUser: state.profile.identityUser
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ProfileActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MainIndexComponent);
