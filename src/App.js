import React, { useState, useEffect, useReducer } from "react";
import openSocket from "socket.io-client";
import classnames from "classnames";

import Config from "../config.json";
import Sidebar from "./Sidebar";
import Screen from "./Screen";
import Footer from "./Footer";
import DataContext from "./DataContext";
import reducer from "./reducer.js";
import "./App.scss";

const socket = openSocket(`${Config.socket.server}:${Config.socket.port}`);

const App = () => {
  const [notification, setNotification] = useState("");
  const [notificationTimer, setNotificationTimer] = useState(0);
  const [state, dispatch] = useReducer(reducer, { integrations: {} });

  useEffect(() => {
    socket.on("NOTIFICATION", obj => {
      const { integration, data } = obj;

      if (integration === "mqtt" && data.topic === "door/outer/opened/username") {
        setNotification(data.message);
        clearTimeout(notificationTimer);
        setNotificationTimer(
          setTimeout(() => {
            setNotification("");
          }, Config.notification.default)
        );
      }
      dispatch({ type: integration, data });
    });
  }, []);

  return (
    <DataContext.Provider value={state || false}>
      <div
        className={classnames("App", {
          "App--notification": !!notification
        })}
      >
        <div className="App__container">
          <div className="SidebarWrapper">
            <Sidebar />
          </div>
          <div className="MainWrapper">
            <Screen />
          </div>
          <div className="FooterWrapper">
            <Footer notification={notification} />
          </div>
        </div>
      </div>
    </DataContext.Provider>
  );
};

export default App;
