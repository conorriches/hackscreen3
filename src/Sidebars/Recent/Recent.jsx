import React from "react";
import DataContext from "../../DataContext";
import "./Recent.scss";

export default () => {
  const state = React.useContext(DataContext);
  const data = state.mqtt ? state.mqtt : {};

  const recent = data["cone/door/outer/opened"] || [];

  return (
    <div className="Recent">
      <h2>Recently entered</h2>
      <ul>
        {recent.map(item => (
          <li>
            {item.name} <small>{item.time}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};
