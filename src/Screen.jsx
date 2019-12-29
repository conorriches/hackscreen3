import React, { Component } from "react";
import Config from "./config.json";
import classnames from "classnames";
import * as ScreenSlides from "./Screens";

class Screen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screenIndex: 0,
      visible: true,
      timeout: 0
    };
  }

  render() {
    const thisScreen = Config.main.screens[this.state.screenIndex];
    const Component = ScreenSlides[thisScreen.name];

    if (!this.state.visible) {
      setTimeout(() => {
        const lastIndex = Config.main.screens.length - 1;
        if (this.state.screenIndex === lastIndex) {
          this.setState({ screenIndex: 0, visible: true });
        } else {
          this.setState({
            screenIndex: this.state.screenIndex + 1,
            visible: true
          });
        }
      }, 500);
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
        className={classnames("Screen", {
          "Screen--Transition": !this.state.visible
        })}
      >
        {Component && <Component />}
      </div>
    );
  }
}

export default Screen;
