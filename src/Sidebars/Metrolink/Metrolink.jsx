import React from "react";
import DataContext from "../../DataContext";
import "./Metrolink.scss";

export default () => {
  const state = React.useContext(DataContext);
  const data = state.metrolink ? state.metrolink.message : {};

  const TramJewel = ({ direction, tramData }) => {
    return (
      <div className="Metrolink__Item Metrolink__Item--Inbound">
        <h2>{direction}</h2>
        {tramData.length ? (
          <h3>
            {tramData[0].destination}{" "}
            <b className="Metrolink__Time">
              {tramData[0].time == 0 ? "arrv" : tramData[0].time}{" "}
              {tramData[0].time == 1 && "min"}
              {tramData[0].time > 1 && "mins"}
            </b>
          </h3>
        ) : (
          <h3>For live times, visit tfgm.com</h3>
        )}
      </div>
    );
  };

  return (
    <div className="Metrolink">
      <h2>Next tram</h2>
      <h3>Holt Town</h3>
      {data.inbound && (
        <TramJewel direction="Inbound" tramData={data.inbound} />
      )}
      {data.outbound && (
        <TramJewel direction="Outbound" tramData={data.outbound} />
      )}
    </div>
  );
};
