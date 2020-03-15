import React from "react";
import DataContext from "../../DataContext";
import "./Recent.scss";

export default () => {
  const state = React.useContext(DataContext);
  const data = state.mqtt ? state.mqtt : {};

  const recent = data["door/outer/opened/username"] || [];

  return (
    <div className="Recent">
      <h2>Recently entered</h2>
      <ul>
        {recent.map(item => {
          if (item.name == "anon" || !item.name) item.name = "👻";

          return (
            <li>
              {item.name} <small>{item.time}</small>
            </li>
          );
        })}
        <li>
          <div className="Recent__Name">Test</div>
          <div className="Recent__Time">20:20</div>
        </li>
        <li>
          <div className="Recent__Name">Test</div>
          <div className="Recent__Time">20:20</div>
        </li>
        <li>
          <div className="Recent__Name">Test</div>
          <div className="Recent__Time">20:20</div>
        </li>
      </ul>
    </div>
  );
};
