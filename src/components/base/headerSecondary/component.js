import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import { urls } from '../../../routes';

class HeaderSecondaryComponent extends Component {

  render() {
    return (
      <header className="header header-secondary">
        <Link to={urls.index.path} className="logo">Dynamis</Link>
        <Link to={urls.login.path} className="btn btn-blue">Login</Link>
      </header>
    );
  }
}

export default HeaderSecondaryComponent;
