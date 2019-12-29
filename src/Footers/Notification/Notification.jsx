import React, { Component } from "react";
import "./Notification.scss";

class Notification extends Component {
  render() {
    return (
      <div className="Notification">
        <div className="Notification__inner">
          <span className="Notification__type">
            {this.props.type === "entered" && "🔑"}
          </span>
          <span className="Notification__message">{this.props.message}</span>
        </div>
      </div>
    );
  }
}

export default Notification;
