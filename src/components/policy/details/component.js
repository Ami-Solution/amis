import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import CustomSpiner from '../../base/spiner/component';

import * as PolicyActions from '../../../actions/policy';

import { urls } from '../../../routes';

const POLICY_STATE = [
  { label: 'POLICY_STATUS_INIT', state: 1 },
  { label: 'POLICY_STATUS_SUBMITTED', state: 2 },
  { label: 'POLICY_STATUS_ON_RISK_ASSESSMENT_REVIEW', state: 4 },
  { label: 'POLICY_STATUS_APPROVED', state: 5 },
  { label: 'POLICY_STATUS_ON_SMART_DEPOSIT_REFUND', state: 6 },
  { label: 'POLICY_STATUS_DELETED', state: 7 },
  { label: 'POLICY_STATUS_ACTIVE', state: 8 },
  { label: 'POLICY_STATUS_WAIT_FOR_PREMIUM', state: 9 },
  { label: 'POLICY_STATUS_ON_COMPLETENESS_CHECK', state: 10 }
];

class PolicyDetailsComponent extends Component {
  constructor(props) {
    super(props);
    this.renderPolicyDetails = this.renderPolicyDetails.bind(this);
    this.renderPolicyStatusInit = this.renderPolicyStatusInit.bind(this);
    this.renderPolicyStatusSubmitted = this.renderPolicyStatusSubmitted.bind(this);
    this.renderPolicyStatusOnRiskAssessmentReview =
      this.renderPolicyStatusOnRiskAssessmentReview.bind(this);
    this.handleEditPolicy = this.handleEditPolicy.bind(this);
    this.handlePayDeposit = this.handlePayDeposit.bind(this);
  }

  componentWillMount() {
    this.props.getPolicy(this.props.user.policies[this.props.user.policies.length - 1].id);
  }

  handleEditPolicy(event) {
    event.preventDefault();
    browserHistory.push(urls.main.historyForm1.path);
  }

  handlePayDeposit(event) {
    event.preventDefault();
    this.props.changePoolState('depositInfo');
  }

  renderPolicyDetails() {
    switch (this.props.policy.state) {
      case POLICY_STATE.find(s => s.label === 'POLICY_STATUS_INIT').state:
        return this.renderPolicyStatusInit();
      case POLICY_STATE.find(s => s.label === 'POLICY_STATUS_SUBMITTED').state:
        return this.renderPolicyStatusSubmitted();
      default:
        return this.renderPolicyStatusSubmitted();
        {/*return <CustomSpiner />;*/}
    }
  }

  renderPolicyStatusInit() {
    const { policy } = this.props;
    return (
      <div>
        <div className="panel-body">
          <div className="table table-policy-details">
            <table>
              <colgroup>
                <col className="col-title" />
                <col className="col-detail" />
              </colgroup>
              <tbody>
                <tr>
                  <td>Policy #</td>
                  <td>{policy.id}</td>
                </tr>
                <tr>
                  <td>Status</td>
                  <td>Incomplete</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <footer className="panel-foot">
          <a href="" className="link-edit" onClick={this.handleEditPolicy}>Edit Policy</a>
          <a href="" className="link-more material-icons">more_vert</a>
        </footer>
      </div>);
  }

  renderPolicyStatusSubmitted() {
    const { policy } = this.props;
    return (
      <div>
        <div className="panel-body">
          <div className="table table-policy-details">
            <table>
              <colgroup>
                <col className="col-title" />
                <col className="col-detail" />
              </colgroup>
              <tbody>
                <tr>
                  <td>Policy #</td>
                  <td>{policy.id}</td>
                </tr>
                <tr>
                  <td>Status</td>
                  <td>Waiting for Smart Deposit</td>
                </tr>
              </tbody>
            </table>
          </div>
          <a href="" onClick={this.handlePayDeposit} className="btn btn-block">
            <i className="material-icons">credit_card</i>
            Pay Smart Deposit
          </a>
        </div>
      </div>);
  }

  renderPolicyStatusOnRiskAssessmentReview() {
    const { policy } = this.props;
    return (
      <div>
        <div className="panel-body">
          <div className="table table-policy-details">
            <table>
              <colgroup>
                <col className="col-title" />
                <col className="col-detail" />
              </colgroup>
              <tbody>
                <tr>
                  <td>Policy #</td>
                  <td>{policy.id}</td>
                </tr>
                <tr>
                  <td>Status</td>
                  <td>Incomplete</td>
                </tr>
                <tr>
                  <td>Effective Date</td>
                  <td>1/21/2016</td>
                </tr>
                <tr>
                  <td>Eligibility</td>
                  <td>12 days to elegibility</td>
                </tr>
                <tr>
                  <td>Payment Plan</td>
                  <td>Monthly – Manual Pay</td>
                </tr>
              </tbody>
            </table>
          </div>
          <a href="" className="btn btn-block">
            <i className="material-icons">credit_card</i>
            Make Your September 31st Payment Now
          </a>
        </div>
        <footer className="panel-foot">
          <a href="" className="link-edit">Edit Policy</a>
          <a href="" className="link-more material-icons">more_vert</a>
        </footer>
      </div>);
  }

  render() {
    return (
      <div>
        <header className="panel-head">
          <div className="panel-head-aside">
            <p>$2/Mo.</p>
          </div>
          <h2 className="panel-title">Policy Details</h2>
        </header>
        {this.renderPolicyDetails()}
      </div>
    );
  }
}

PolicyDetailsComponent.propTypes = {
  policy: PropTypes.object.isRequired,
  getPolicy: PropTypes.func.isRequired,
  changePoolState: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    policy: state.policy.policy,
    user: state.profile.user
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(PolicyActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PolicyDetailsComponent);
