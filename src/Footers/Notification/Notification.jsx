import React, { Component } from "react";
import "./Notification.scss";

class Notification extends Component {
  render() {
    let message = this.props.message;
    if (this.props.type === "entered") {
      message = decodeURIComponent(this.props.message);
    }
    return (
      <div className="Notification">
        <div className="Notification__inner">
          <span className="Notification__type">
            {this.props.type === "entered" && "🔑"}
          </span>
          <span className="Notification__message">{message}</span>
        </div>
      </div>
    );
  }
}

export default Notification;
