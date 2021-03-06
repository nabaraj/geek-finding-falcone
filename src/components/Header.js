import React, { Component } from "react";
import { connect } from "react-redux";
import { resetAppFn } from "./../actions/getDataAction";
import { bindActionCreators } from "redux";

import Notification from "./Notification";
class Header extends Component {
  render() {
    return (
      <header className="App-header p-3 mb-2 bg-gradient-dark text-light fixed-top">
        <nav className="container">
          <ul className="nav justify-content-end headerNav">
            <li>
              <span
                onClick={e => this.props.resetAppFn(true)}
                className="text-white resetLink"
              >
                Reset
              </span>
            </li>
            <li>
              <a href="https://www.geektrust.in/" className="text-white">
                Geek Trust Home
              </a>
            </li>
          </ul>
        </nav>
        {this.props.notification && (
          <Notification notification={this.props.notification} />
        )}
      </header>
    );
  }
}
function mapStateToProps(state) {
  return {
    notification: state.appsData.notificationObject
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      resetAppFn: resetAppFn
    },
    dispatch
  );
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
