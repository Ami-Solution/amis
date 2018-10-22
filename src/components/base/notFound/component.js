import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import FooterComponent from '../footer/component';
import HeaderLogedComponent from '../headerLoged/component';

class NotFoundComponent extends Component {
  render() {
    const handleGoBack = () => {
      browserHistory.goBack();
    };
    return (
      <div className="wrapper">
        <HeaderLogedComponent />
        <div className="main">
          <div className="shell">
            <section className="section section-form section-form-secondary">
              <div className="section-inner">
                <div className="section-body">
                  <div className="section-group section-group-secondary">
                    <p>Page not found...</p>
                    <a href="" onClick={handleGoBack}>Go back</a>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        <FooterComponent />
      </div>
    );
  }
}

export default NotFoundComponent;
