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
          {data.inbound.length ? (
            <h3>
              {data.inbound[0].destination}{" "}
              <b className="Metrolink__Time">
                {data.inbound[0].time == 0 ? "arrv" : data.inbound[0].time}{" "}
                {data.inbound[0].time == 1 && "min"}
                {data.inbound[0].time > 1 && "mins"}
              </b>
            </h3>
          ) : (
            <h3>No trams in the next half hour</h3>
          )}
        </div>
      )}

      {data.outbound && (
        <div className="Metrolink__Item Metrolink__Item--Inbound">
          <h2>Outbound</h2>
          {data.outbound.length ? (
            <h3>
              {data.outbound[0].destination}{" "}
              <b className="Metrolink__Time">
                {data.outbound[0].time == 0 ? "arrv" : data.outbound[0].time}{" "}
                {data.outbound[0].time == 1 && "min"}
                {data.outbound[0].time > 1 && "mins"}
              </b>
            </h3>
          ) : (
            <h3>No trams in the next half an hour</h3>
          )}
        </div>
      )}
    </div>
  );
};
