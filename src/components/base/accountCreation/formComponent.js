import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link, browserHistory } from 'react-router';

import { urls } from '../../../routes';

export const fields = ['email', 'password1', 'password2'];

const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,10}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.password1) {
    errors.password1 = 'Required';
  } else if (values.password1.length < 6) {
    errors.password1 = 'Must be 6 characters or more';
  }
  if (!values.password2) {
    errors.password2 = 'Required';
  } else if (values.password1 !== values.password2) {
    errors.password2 = 'Paswords must match';
  }
  return errors;
};

class AccountCreationForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderField = this.renderField.bind(this);
    this.handleLink = this.handleLink.bind(this);
  }

  handleSubmit(values) {
    const data = values;
    data.keybase_username = this.props.identityUser.username ||
      window.localStorage.getItem('username');
    this.props.accountCreate(
      data,
      () => (browserHistory.push(urls.sendEmail.path)),
      () => {
        this.props.array.removeAll('password1');
        this.props.array.removeAll('password2');
      }
    );
    this.props.untouch('password1');
    this.props.untouch('password2');
  }

  handleLink(event) {
    event.preventDefault();
    browserHistory.push(urls.identity.path);
  }

  renderField({ input, label, type, meta: { touched, error } }) {
    return (
      <div className="form-row">
        <label htmlFor="field-email" className="form-label hidden">{label}</label>
        <div>
          <input
            {...input}
            className="field" placeholder={label} type={type}
          />
        </div>
        <div>
          {touched && error && <span className="error">{error}</span>}
        </div>
      </div>
    );
  }

  render() {
    const { handleSubmit, identityUser, isFetched } = this.props;
    return (
      <div>
        <div className="user">
          <header className="user-head">
            <h2>
              <i className="ico-check-secondary" />
              Online Identity
            </h2>
            <a
              href=""
              onClick={this.handleLink} to={urls.identity.path}
              className="link"
            >
              change keybase user
            </a>
          </header>
          <div className="user-body">
            <a
              href={`http://www.keybase.io/${identityUser.username ||
                window.localStorage.getItem('username')}`}
              target="_blank"
            >
              <span>
                <img
                  src={identityUser.avatarPath ? identityUser.avatarPath :
                    window.localStorage.getItem('avatarPath')}
                  alt="avatar" width="39" height="39"
                />
              </span>
              <small>
                {identityUser.username ? identityUser.username :
                  window.localStorage.getItem('username')}
              </small>
            </a>
          </div>
        </div>
        <div className="section-content">
          <div className="form form-identity">
            <form onSubmit={handleSubmit(this.handleSubmit)}>
              <div className="form-body">
                <Field name="email" type="text" component={this.renderField} label="Your Email" />
                <Field name="password1" type="password" component={this.renderField} label="Create a Password" />
                <Field name="password2" type="password" component={this.renderField} label="Retype Password" />
              </div>
              <div className="form-actions">
                <button
                  type="submit"
                  className="btn btn-blue btn-big btn-big-create-login"
                  disabled={isFetched}
                >
                  {isFetched ? <i className="fa fa-spin fa-spinner" /> : null} Create Login
                </button>
                <a
                  href="https://keybase.io"
                  className="link" target="_blank"
                >
                  What’s keybase?
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

AccountCreationForm.propTypes = {
  accountCreate: PropTypes.func.isRequired,
  clearIdentity: PropTypes.func.isRequired,
  untouch: PropTypes.func.isRequired,
  identityUser: PropTypes.object.isRequired,
  array: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isFetched: PropTypes.bool.isRequired
};

export default reduxForm({
  form: 'AccountCreationForm',
  validate
})(AccountCreationForm);

