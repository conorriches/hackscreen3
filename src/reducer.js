import React from "react";
import Config from "../config.json";

export default (state, action) => {
  const { type, data } = action;
  const now = new Date();

  switch (type) {
    case "metrolink":
      return Object.assign({}, state, {
        metrolink: data
      });
    case "football":
      return Object.assign({}, state, {
        football: data
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

      if (data.topic === "door/outer/opened/username") {
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
      console.error("Unknown type in reducer", type);
  }
};
