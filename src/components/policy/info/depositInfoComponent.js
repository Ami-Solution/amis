import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as PolicyActions from '../../../actions/policy';
import { urls } from '../../../routes';

const DEPOSIT_STATE = [
  { label: 'INITIAL', state: 1 },
  { label: 'POLICY_STATUS_SUBMITTED', state: 2 },
  { label: 'POLICY_STATUS_ON_RISK_ASSESSMENT_REVIEW', state: 3 }
];

class DepositInfoComponent extends Component {

  componentWillMount() {
    this.props.getDepositInfo(this.props.policy.id);
  }
  render() {
    const { depositInfo } = this.props;
    return (
      <div className="panel panel-options">
      {depositInfo.status ?
        <div>
          <div className="panel-body">
            <ul className="list-options">
              <li>
                Smart Deposit: $summ
              </li>
              <li>
                Status: initial
              </li>
            </ul>
          </div>
          <footer className="panel-foot">
            <a href="" className="btn btn-large">Send</a>
          </footer>
        </div> : null
      }
      </div>
    );
  }
}

DepositInfoComponent.propTypes = {
  policy: PropTypes.object.isRequired,
  getDepositInfo: PropTypes.func.isRequired,
  depositInfo: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    policy: state.policy.policy,
    depositInfo: state.policy.depositInfo
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(PolicyActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DepositInfoComponent);
