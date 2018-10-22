import React, { Component, PropTypes } from 'react';

import FooterComponent from './footer/component';
import HeaderSecondaryComponent from './headerSecondary/component';

class BaseComponent extends Component {

  render() {
    return (
      <div className="wrapper">
        <HeaderSecondaryComponent />
        {this.props.children}
        <FooterComponent />
      </div>
    );
  }
}

BaseComponent.propTypes = {
  children: PropTypes.element.isRequired
};

export default BaseComponent;
