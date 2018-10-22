import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';

import { urls } from '../../../routes';

class IndexComponent extends Component {

  componentWillMount() {
    if (window.localStorage.getItem('isLogin')) {
      browserHistory.push(urls.main.path);
    }
  }
  render() {
    const handleLink = (event) => {
      event.preventDefault();
      if (window.localStorage.getItem('username')) {
        browserHistory.push(urls.accountCreation.path);
      } else {
        browserHistory.push(urls.identity.path);
      }
    };

    return (
      <div>
        <div className="intro">
          <div className="shell">
            <div className="intro-inner">
              <div className="intro-content">
                <p>
                  <strong>Dynamis</strong> is
                    a peer to peer income coverage app which offers a better way
                    to manage the costs and risks associated with severance benefits.
                  <a href="" className="link">…learn more</a>
                </p>
              </div>
              <div className="intro-actions">
                <a href="" onClick={handleLink} className="btn btn-white">Create a Policy</a>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default IndexComponent;
