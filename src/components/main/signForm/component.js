import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as HistoryActions from '../../../actions/history';

import { urls } from '../../../routes';
import { getSignApplication, getPolicy } from '../../../utils';

class SignFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { sign: undefined };
    this.handleEditPositions = this.handleEditPositions.bind(this);
    this.handleSignForm = this.handleSignForm.bind(this);
    this.handleTextArea = this.handleTextArea.bind(this);
  }

  componentWillMount() {
    if (this.props.positionList.length === 0) {
      browserHistory.push(urls.main.historyForm1.path);
    } else {
      this.props.updatePolicy(
        getPolicy(this.props.user),
        getSignApplication(this.props.positionList, this.props.user));
    }
  }

  handleEditPositions(event) {
    event.preventDefault();
    browserHistory.push(urls.main.historyForm1.path);
  }

  handleSignForm(event) {
    event.preventDefault();
    const data = {
      keybase_username: this.props.user.keybase_username,
      signed_message: this.state.sign
    };
    this.props.signPolicy(
      getPolicy(this.props.user),
      data,
      () => browserHistory.push(urls.main.policy.path)
    );
  }

  handleTextArea(event) {
    this.setState({ sign: event.target.value });
  }

  render() {
    const getFeatureField = (title, value) => (
      <li className="feature">
        <h6>{title}</h6>
        <p>{value}</p>
      </li>
    );
    const { positionList, user, isFetched } = this.props;
    const { sign } = this.state;
    return (
      <section className="section section-form section-form-quaternary section-finalize">
        <h5 className="section-title">Create a Policy</h5>
        <div className="section-inner">
          <div className="section-body">
            <div className="section-content">
              <div className="package">
                <header className="package-head">
                  <h2>Your Coverage</h2>
                  <h5>Based on your parameters and level of peer-to-peer verification</h5>
                </header>
                <div className="package-content">
                  <div className="package-body">
                    <ul className="features">
                      {getFeatureField('Your Premium', '$6/month')}
                      {getFeatureField('Your Coverage', '$1100/month')}
                      {getFeatureField('Duration', '4 month max.')}
                      {getFeatureField('Deposit', '$100')}
                    </ul>
                  </div>
                  <footer className="package-foot">
                    <div className="form form-signature">
                      <div className="form-head">
                        <h5>Sign Application</h5>
                      </div>
                      <div className="form-content">
                        <div className="form-body">
                          <div className="form-row">
                            <label htmlFor="field-singature" className="form-label hidden">
                              Your Keybase Signature
                            </label>
                            <div className="form-controls">
                              <textarea
                                defaultValue={getSignApplication(positionList, user, true)}
                                type="text" rows="10" className="field"
                                placeholder="Your Keybase Signature"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-hint">
                      To complete your application, you must sign all your information here with keybase:
                      <a href="https://keybase.io/sign" target="_blank" className="link"> https://keybase.io/sign.</a>
                      This will verify that all your information is accurate and we didn't change it.
                    </div>
                  </footer>
                  <footer className="package-foot">
                    <div className="form form-signature">
                      <div className="form-head">
                        <h5>Accept Policy</h5>
                      </div>
                      <div className="form-content">
                        <div className="form-body">
                          <div className="form-row">
                            <label htmlFor="field-singature" className="form-label hidden">
                              Your Keybase Signature
                            </label>
                            <div className="form-controls">
                              <textarea
                                type="text" rows="10" className="field"
                                placeholder="Your Keybase Signature"
                                onChange={this.handleTextArea}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-hint">
                      <div className="form-actions">

                        <button
                          onClick={this.handleSignForm}
                          className="btn btn-blue btn-big btn-big-fetched"
                          disabled={!sign || isFetched}
                        >
                          {isFetched ? <i className="fa fa-spin fa-spinner" /> :
                            <span>&nbsp;&nbsp;&nbsp;</span>} Submit For Review
                        </button>
                      </div>
                      <br />
                      <a href="" onClick={this.handleEditPositions} className="link">
                        No, I need to edit my parameters
                      </a>
                    </div>
                  </footer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

SignFormComponent.propTypes = {
  positionList: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  updatePolicy: PropTypes.func.isRequired,
  signPolicy: PropTypes.func.isRequired,
  isFetched: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    positionList: state.history.positionList,
    user: state.profile.user,
    isFetched: state.history.isFetched
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(HistoryActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SignFormComponent);
