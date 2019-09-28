import React, { Component } from "react";
import { connect } from "react-redux";
import { resetAppFn } from "./../actions/getDataAction";
import { bindActionCreators } from "redux";

class Header extends Component {
  render() {
    return (
      <header className="App-header">
        <div className="container">
          <ul className="nav justify-content-end">
            <li>
              <button
                type="button"
                onClick={e => this.props.resetAppFn(true)}
                className="btn btn-outline-info"
              >
                Reset
              </button>
            </li>
          </ul>
        </div>
        {this.props.notification && (
          <div className="toast fade show">
            <div className="toast-header">Notification</div>
            <div className="toast-body">{this.props.notification}</div>
          </div>
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
