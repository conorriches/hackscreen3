import React, { Component } from "react";
import "./Welcome.scss";
import Config from "../../config.json";

export default class Welcome extends Component {
  render() {
    return (
      <div className="Welcome">
        <div className="Welcome__Inner">
          <h1>Welcome to {Config.name}</h1>
        </div>
      </div>
    );
  }
}
