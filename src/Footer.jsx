import React from "react";
import Clock from "./Components/Clock/Clock";
import Notification from "./Footers/Notification/Notification";
import Config from "./config.json";

import DataContext from "./DataContext";

const latestState = msgs => {
  if (!!msgs) {
    if (msgs.length) {
      return msgs[msgs.length - 1].message;
    }
  }
  return "no";
};

const Footer = ({ notification, open }) => {
  const state = React.useContext(DataContext);
  const data = state.mqtt ? state.mqtt : {};

  const doorOpen = latestState(data["cone/door/outer/state"]) === "opened";
  return (
    <div className="Footer">
      {notification ? (
        <Notification type="entered" message={notification} />
      ) : (
        <>
          <div className="Footer__Jewel">
            <Clock />
          </div>
          {doorOpen && (
            <div className="Footer__Jewel Footer__Jewel--danger">
              <span role="img" aria-label="door">
                🚪
              </span>
              door open
            </div>
          )}
          {!doorOpen && (
            <div className="Footer__Ticker-Wrapper">
              <div className="Footer__Ticker">
                <div className="Footer__Ticker-Content">
                  Welcome to {Config.name}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Footer;
