import React from "react";

const Notification = props => {
  let { position } = props;
  return (
    <div className={`toast fade show ${position}`}>
      <div className="toast-header">
        <span className="bg-danger rounded"></span>Notification
      </div>
      <div className="toast-body">{props.notification}</div>
    </div>
  );
};

export default Notification;
