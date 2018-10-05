import React, { Component, PropTypes } from 'react';

class PolicyPoolComponent extends Component {

  render() {
    return (
      <div className="panel panel-pool">
        <header className="panel-head">
          <i className="ico-umbrellas" />
          <h2 className="panel-title">My P2P Pool</h2>
        </header>
        <div className="panel-body">
          <div className="table table-peers">
            <table>
              <tbody>
                <tr>
                  <td>
                    <i className="material-icons">&#xE7FD;</i>
                  </td>
                  <td>
                    Fred Smith
                  </td>
                  <td>
                    Insr. Score <span className="score">128</span>
                  </td>
                  <td>
                    <a href="" className="link-add material-icons">&#xE145;</a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <i className="material-icons">&#xE7FD;</i>
                  </td>
                  <td>
                    Lyne Knight
                  </td>
                  <td>
                    Insr. Score <span className="score">133</span>
                  </td>
                  <td>
                    <a href="" className="link-add material-icons">&#xE145;</a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <i className="material-icons">&#xE7FD;</i>
                  </td>
                  <td>
                    Joe Mann
                  </td>
                  <td>
                    Insr. Score <span className="score">198</span>
                  </td>
                  <td>
                    <a href="" className="link-add material-icons">&#xE145;</a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <i className="material-icons">&#xE7FD;</i>
                  </td>
                  <td>
                    Larry Bird
                  </td>
                  <td>
                    Insr. Score <span className="score">111</span>
                  </td>
                  <td>
                    <a href="" className="link-add material-icons">&#xE145;</a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <i className="material-icons">&#xE7FD;</i>
                  </td>
                  <td>
                    Betty Ford
                  </td>
                  <td>
                    Insr. Score <span className="score">98</span>
                  </td>
                  <td>
                    <a href="" className="link-add material-icons">&#xE145;</a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <i className="material-icons">&#xE7FD;</i>
                  </td>
                  <td>
                    Jem Smith
                  </td>
                  <td>
                    Insr. Score <span className="score">221</span>
                  </td>
                  <td>
                    <a href="" className="link-add material-icons">&#xE145;</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <footer className="panel-foot">
          <a href="" className="link-invite">Invite Peers</a>
          <a href="" className="link-more material-icons">more_vert</a>
        </footer>
      </div>
    );
  }
}

export default PolicyPoolComponent;
