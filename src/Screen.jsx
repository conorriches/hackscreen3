import React, { Component } from "react";
import Config from "../config.json";
import classnames from "classnames";
import * as ScreenSlides from "./Screens";

class Screen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screenIndex: 0,
      visible: true,
      timeoutId: 0
    };
  }

  render() {
    const thisScreen = Config.main.screens[this.state.screenIndex];
    const Component = ScreenSlides[thisScreen.name];

    if (!this.state.visible) {
      setTimeout(() => {
        const lastIndex = Config.main.screens.length - 1;
        if (this.state.screenIndex === lastIndex) {
          this.setState({
            screenIndex: 0,
            visible: true
          });
        } else {
          this.setState({
            screenIndex: this.state.screenIndex + 1,
            visible: true
          });
        }
      }, 10);
    } else {
      if (this.state.timeoutId === 0) {
        const timeoutId = setTimeout(() => {
          this.setState({ visible: false, timeoutId: 0 });
        }, thisScreen.time * 1000);
        this.setState({ timeoutId });
      }
    }
    return (
      <div
        className={classnames("Screen", {
          "Screen--Transition": !this.state.visible
        })}
      >
        {this.state.visible && (
          <div className="Screen__Timer-Wrapper">
            <div
              className={classnames(
                `Screen__Timer--${thisScreen.time}`,
                "Screen__Timer"
              )}
            ></div>
          </div>
        )}
        <div className="Screen__Component">
          {Component ? (
            <Component />
          ) : (
            <>
              <h3>
                Error loading screen - did you export it in
                /src/Screens/index.js?
              </h3>
              <h3>
                Nothing found with name:
                {thisScreen.name}
              </h3>
            </>
          )}
        </div>
      </div>
    );
  }
}

export default Screen;
