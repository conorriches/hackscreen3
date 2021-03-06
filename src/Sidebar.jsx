import React, { Component } from "react";
import Config from "../config.json";
import classnames from "classnames";
import * as ScreenSlides from "./Sidebars";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screenIndex: 0,
      visible: true,
      timeout: 0
    };
  }

  render() {
    const thisScreen = Config.sidebar.screens[this.state.screenIndex];
    const Component = ScreenSlides[thisScreen.name];

    if (!this.state.visible) {
      setTimeout(() => {
        const lastIndex = Config.sidebar.screens.length - 1;
        if (this.state.screenIndex === lastIndex) {
          this.setState({ screenIndex: 0, visible: true });
        } else {
          this.setState({
            screenIndex: this.state.screenIndex + 1,
            visible: true
          });
        }
      }, 1500);
    } else {
      if (this.state.timeout === 0) {
        const timeout = setTimeout(() => {
          this.setState({ visible: false, timeout: 0 });
        }, thisScreen.time * 1000);
        this.setState({ timeout });
      }
    }
    return (
      <div
        className={classnames("Sidebar", {
          "Screen--Transition": !this.state.visible
        })}
      >
        {Component && <Component />}
      </div>
    );
  }
}

export default Sidebar;
