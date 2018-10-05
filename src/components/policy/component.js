import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as HistoryActions from '../../actions/history';
import { urls } from '../../routes';

import CustomSpiner from '../base/spiner/component';
import PolicyDetailsComponent from './details/component';
import PolicyInfoComponent from './info/component';
import PolicyPoolComponent from './pool/component';

class PolicyComponent extends Component {

  render() {
    const { isAuth } = this.props;
    return (
      <section className="section section-policy">
        <h1 className="title title-primary">My Policy</h1>
        <section className="section section-policy">
          <div className="cols">
            <div className="col col-3of5">
              <PolicyInfoComponent />
            </div>
            <div className="col col-2of5">
              <div className="panel panel-details">
                {!isAuth ?
                  <CustomSpiner /> :
                  <PolicyDetailsComponent />
                }
              </div>
              <PolicyPoolComponent />
            </div>
          </div>
        </section>
      </section>
    );
  }
}

PolicyComponent.propTypes = {
  isAuth: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    isAuth: state.profile.isAuth
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(HistoryActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PolicyComponent);
