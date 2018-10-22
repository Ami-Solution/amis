import React, { Component, PropTypes } from 'react';

class SendEmailMessageComponent extends Component {

  render() {
    return (
      <div className="main">
        <div className="shell">
          <section className="section section-form section-form-secondary">
            <h5 className="section-title">Create a Policy</h5>
            <div className="section-inner">
              <div className="section-body">
                <div className="section-group section-group-secondary">
                  We sent you a verification e-mail. Please check your mailbox...
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default SendEmailMessageComponent;
