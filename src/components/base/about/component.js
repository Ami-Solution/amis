import React, { Component, PropTypes } from 'react';

class AboutComponent extends Component {

  render() {
    return (
      <div className="intro">
        <div className="shell">
          <div className="intro-inner">
            <div className="intro-content">
              <p>
                Ethereum is a blockchain 2.0 technology capable of providing
                a platform for the operation of smart contracts.
                Whereas Bitcoin functions as a currency this new technology
                would function to allow software code to hold, transfer,
                receive, or spend digital assets. The Ethereum blockchain
                is a decentralized ledger governed by computer protocols
                that facilitate, verify and enforce contracts. It is within
                this blockchain protocol that smart contracts are negotiated.
                In theory this technology could allow for the creation
                of DAOs Decentralized Autonomous Organizations which
                are corporate entities that possess no full-time human
                employees while still being able to perform all the same
                functions as traditional corporations. Insurance is an
                obvious first use case of truly programmable money and
                provides a great opportunity for smart contracts to
                demonstrate the extent of their capabilities.
              </p>
              <p>
                The current trend of the sharing economy is seeking to
                decentralize every type of service into a peer to peer model.
                We have seen this with companies offering distributed taxi
                and hotel services such as Uber and Airbnb. Technologies
                such as the smartphone capable of running apps which connect
                riders with drivers or renters with home owners have been
                a powerful platform which has enabled this innovation.
                These services are now more convenient and are more
                price competitive than their traditional counterparts
                while simultaneously providing income opportunities to people
                that didn’t exist previously.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AboutComponent;
