import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as HistoryActions from '../../../actions/history';
import { urls } from '../../../routes';


class InitInfoComponent extends Component {

  render() {
    return (
      <div className="panel panel-options">
        <div className="panel-body">
          <ul className="list-options">
            <li>
              <a href="">
                <i className="ico-verify" />
                Verify My Policy
              </a>
            </li>
            <li>
              <a href="">
                <i className="ico-history" />
                Payment &amp; Claim History
              </a>
            </li>
            <li>
              <a href="">
                <i className="ico-claim" />
                Open A Claim
              </a>
            </li>
            <li>
              <a href="">
                <i className="ico-close-policy" />
                Close Policy
              </a>
            </li>
          </ul>
        </div>
        <footer className="panel-foot">
          <a href="" className="btn btn-large">More Policy Details</a>
        </footer>
      </div>
    );
  }
}

InitInfoComponent.propTypes = {
  user: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.profile.user
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(HistoryActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(InitInfoComponent);
