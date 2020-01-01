import React, { useState, useEffect, useReducer } from "react";
import openSocket from "socket.io-client";
import classnames from "classnames";
import Config from "../config.json";
import Sidebar from "./Sidebar";
import Screen from "./Screen";
import Footer from "./Footer";
import DataContext from "./DataContext";
import "./App.scss";

const socket = openSocket(`${Config.socket.server}:${Config.socket.port}`);

const reducer = (state, action) => {
  const { type, data } = action;
  const now = new Date();

  switch (type) {
    case "metrolink":
      return Object.assign({}, state, {
        metrolink: data
      });
    case "mqtt":
      if (!state.mqtt) {
        state.mqtt = {};
      }
      if (!state.mqtt[data.topic]) {
        state.mqtt[data.topic] = [];
      }
      if (
        state.mqtt[data.topic].length >=
        Config.integrations.mqtt.maxMessagesPerTopic
      ) {
        state.mqtt[data.topic].splice(state.mqtt[data.topic].length - 1, 1);
      }

      if (data.topic === "door/outer/opened") {
        state.mqtt[data.topic].splice(0, 0, {
          name: data.message,
          time: `${now.getHours() < 10 ? "0" : ""}${now.getHours()}:${
            now.getMinutes() < 10 ? "0" : ""
          }${now.getMinutes()}`
        });
      } else {
        state.mqtt[data.topic].push({
          message: data.message
        });
      }
      return Object.assign({}, state);
    default:
      throw new Error();
  }
};
const App = () => {
  const [notification, setNotification] = useState("");
  const [notificationTimer, setNotificationTimer] = useState(0);
  const [state, dispatch] = useReducer(reducer, { integrations: {} });

  useEffect(() => {
    socket.on("NOTIFICATION", obj => {
      const { integration, data } = obj;

      if (integration === "mqtt" && data.topic === "door/outer/opened") {
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
