import React, { Component, PropTypes } from 'react';

import FooterComponent from '../base/footer/component';
import HeaderLogedComponent from '../base/headerLoged/component';

const pathsWithNavigationMenu = ['/policy'];

class MainComponent extends Component {

  render() {
    const { route } = this.props;
    return (
      <div className="wrapper">
        <HeaderLogedComponent
          isNavigation={pathsWithNavigationMenu.indexOf(route.path) !== -1}
        />
        <div className="main">
          <div className="shell">
            {this.props.children}
          </div>
        </div>
        <FooterComponent />
      </div>
    );
  }
}

MainComponent.propTypes = {
  children: PropTypes.element.isRequired,
  route: PropTypes.object.isRequired
};

export default MainComponent;
