import React, { Component } from "react";
import "./Clock.scss";

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = { time: new Date() };
  }

  render() {
    setTimeout(() => this.tick(), 1000);
    let splitDate = this.state.time.toLocaleTimeString().split(":");
    return (
      <div className="Clock">
        <div className="Clock__Inner">
          {splitDate[0]}
          <span className="Clock__Colon">:</span>
          {splitDate[1]}
        </div>
      </div>
    );
  }

  tick() {
    this.setState({ time: new Date() });
  }
}

export default Clock;
