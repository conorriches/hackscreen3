import React, { Component } from "react";
import "./Welcome.scss";
import Config from "../../../config.json";

export default () => (
  <div className="Welcome">
    <div className="Welcome__Inner">
      <h1 className="Welcome__Title">
        Welcome to <br />
        {Config.name}
      </h1>
    </div>
  </div>
);
