import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import * as HistoryActions from '../../../actions/history';
import PositionPanelComponent from '../historyForm1/positionPanel';
import CalendarPanelComponent from '../historyForm1/calendarPanel';
import HeaderStep from '../../base/headerStep/component';

import { urls } from '../../../routes';

require('rc-slider/assets/index.css');

class AssessmentFormComponent extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEditPositions = this.handleEditPositions.bind(this);
    this.handleAdjustCoverage = this.handleAdjustCoverage.bind(this);
    this.handleWorkPeriod = this.handleWorkPeriod.bind(this);
    this.handleCoveragePeriod = this.handleCoveragePeriod.bind(this);
  }

  componentWillMount() {
    if (this.props.positionList.length === 0) {
      browserHistory.push(urls.main.historyForm1.path);
    }
    if (window.localStorage.getItem('questions')) {
      const questions = JSON.parse(window.localStorage.getItem('questions'));
      this.setState({
        howLongStay: questions.howLongStay,
        unemploymentPeriod: questions.unemploymentPeriod
      });
    } else {
      this.setState({
        howLongStay: 0,
        unemploymentPeriod: 0
      });
    }
  }

  handleEditPositions(event) {
    event.preventDefault();
    browserHistory.push(urls.main.historyForm1.path);
  }

  handleAdjustCoverage(event) {
    event.preventDefault();
    browserHistory.push(urls.main.coverageForm.path);
  }

  handleSubmit(event) {
    event.preventDefault();
    browserHistory.push(urls.main.signForm.path);
  }

  handleWorkPeriod(value) {
    return () => {
      this.setState({ howLongStay: value });
      const questions = JSON.stringify({
        howLongStay: value,
        unemploymentPeriod: this.state.unemploymentPeriod
      });
    window.localStorage.setItem('questions', questions);
    };
  }

  handleCoveragePeriod(value) {
    return () => {
      this.setState({ unemploymentPeriod: value });
      const questions = JSON.stringify({
        howLongStay: this.state.howLongStay,
        unemploymentPeriod: value
      });
    window.localStorage.setItem('questions', questions);
    };
  }

  render() {
    const { positionList } = this.props;
    const getRadioFireld = (label, value, state, handler) => (
      <li>
        <div className="radio">
          <input
            type="radio"
            name={state}
            id={label}
            onClick={handler}
            defaultChecked={value == this.state[state]}
          />
          <label className="form-label" htmlFor={label}>{label}</label>
        </div>
      </li>
    );
    return (
      <section className="section section-form">
        <h5 className="section-title">Create a Policy</h5>
        <div className="section-inner">
          <HeaderStep currenStep={5} />
          <div className="section-body">
            <div className="section-group-quaternary">
              <div className="form form-history">
                <div className="form-head">
                  <h2>
                    <i className="ico-check-secondary" />
                    Employment History
                  </h2>
                  <a href="" onClick={this.handleEditPositions} className="link">edit positions</a>
                  <div className="form-head-inner">
                    {positionList.map(position =>
                      <PositionPanelComponent
                        key={position.id}
                        position={position}
                      />
                    )}
                    {positionList.length > 0 ?
                      <CalendarPanelComponent positionList={positionList} /> : null
                    }
                  </div>
                  <h2>Desired Coverage</h2>
                  <p>
                    Below is an estimate of benefits.
                    <br />
                    As your application becomes more complete you can see
                    how this affects your premiums and your coverage:
                  </p>
                </div>
              </div>
              <div className="coverage">
                <div className="coverage-head">
                  <h2>
                    <i className="ico-check-secondary" />
                    Desired Coverage
                  </h2>
                  <a href="" onClick={this.handleAdjustCoverage} className="link">adjust coverage</a>
                </div>
                <div className="coverage-body">
                  <ul className="prices prices-secondary">
                    <li className="price">
                      <h5>Your Estimated Premium:</h5>
                      <p>$8/month</p>
                    </li>
                    <li className="price price-secondary">
                      <h5>While Your Coverage Could Be:</h5>
                      <p>$1100/month</p>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="form form-assessment">
                <div className="form-head">
                  <h2>Self Assessment</h2>
                  <a href="" className="link">
                    <i className="material-icons">info_outline</i>
                    more info
                  </a>
                </div>
                <div className="form-body">
                  <section className="form-section">
                    <p>
                      In a perfect world how long do you see yourself staying
                      with your present employer? Some things to consider
                      <br />
                      might be going back to school or starting a family.
                    </p>
                    <ul className="list-radios">
                      {getRadioFireld('Less than 1 year', 0, 'howLongStay', this.handleWorkPeriod(0))}
                      {getRadioFireld('In about 1 year', 1, 'howLongStay', this.handleWorkPeriod(1))}
                      {getRadioFireld('Before the end of next year', 2, 'howLongStay', this.handleWorkPeriod(2))}
                      {getRadioFireld('Maybe before 2 years time', 3, 'howLongStay', this.handleWorkPeriod(3))}
                      {getRadioFireld('More than 2 years', 4, 'howLongStay', this.handleWorkPeriod(4))}
                      {getRadioFireld(
                        'I love my job. I will work for my present employer till the day I die. :)',
                        5, 'howLongStay',
                        this.handleWorkPeriod(5)
                      )}
                    </ul>
                  </section>
                  <section className="form-section">
                    <p>
                      If and when you finally do need coverage about how long do you
                      suppose you might need it for?
                      <br />
                      Some things to consider might be the acquiring of a new skill,
                      moving to a new industry, starting a completely new career.
                    </p>
                    <ul className="list-radios">
                      {getRadioFireld('About 1 to 2 weeks', 0, 'unemploymentPeriod', this.handleCoveragePeriod(0))}
                      {getRadioFireld('Maybe 3 weeks to 1 month', 1, 'unemploymentPeriod', this.handleCoveragePeriod(1))}
                      {getRadioFireld('Perhaps 1 to 2 months', 2, 'unemploymentPeriod', this.handleCoveragePeriod(2))}
                      {getRadioFireld('Possibly 2 to 3 months', 3, 'unemploymentPeriod', this.handleCoveragePeriod(3))}
                      {getRadioFireld('Potentially 3 to 4 months', 4, 'unemploymentPeriod', this.handleCoveragePeriod(4))}
                      {getRadioFireld(
                        'I will need more than 4 months of coverage.',
                        5, 'unemploymentPeriod',
                        this.handleCoveragePeriod(5)
                        )}
                    </ul>
                  </section>
                </div>
                <div className="form-actions">
                  <button onClick={this.handleSubmit} className="btn btn-blue btn-big btn-big-secondary" >
                    Submit Estimate
                  </button>
                  <a
                    href=""
                    onClick={this.handleEditPositions}
                    className="link"
                  >
                    Wait, I want to edit my settings
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

AssessmentFormComponent.propTypes = {
  positionList: PropTypes.array.isRequired,
  initialPosition: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    positionList: state.history.positionList
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(HistoryActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AssessmentFormComponent);
