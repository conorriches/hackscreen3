import React from "react";
import DataContext from "../../DataContext";
import "./Metrolink.scss";

export default () => {
  const state = React.useContext(DataContext);
  const data = state.metrolink ? state.metrolink.message : {};

  return (
    <div className="Metrolink">
      <h2>Next tram</h2>
      <h3>Holt Town</h3>

      {data.inbound && (
        <div className="Metrolink__Item Metrolink__Item--Inbound">
          <h2>Inbound</h2>
          <h3>
            {data.inbound[0].destination}{" "}
            <b className="Metrolink__Time">
              {data.inbound[0].time === 0 ? "arrv" : data.inbound[0].time}{" "}
              {data.inbound[0].time === 1 && "min"}
              {data.inbound[0].time > 1 && "mins"}
            </b>
          </h3>
        </div>
      )}

      {data.outbound && (
        <div className="Metrolink__Item Metrolink__Item--Inbound">
          <h2>Outbound</h2>
          <h3>
            {data.outbound[0].destination}{" "}
            <b className="Metrolink__Time">
              {data.outbound[0].time === 0 ? "arrv" : data.outbound[0].time}{" "}
              {data.outbound[0].time === 1 && "min"}
              {data.outbound[0].time > 1 && "mins"}
            </b>
          </h3>
        </div>
      )}
    </div>
  );
};
