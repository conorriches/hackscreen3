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
              <div className="Recent__Name"> {item.name} </div>
              <div className="Recent__Time"> {item.time}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
