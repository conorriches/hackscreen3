import React from "react";
import classnames from "classnames";
import DataContext from "../../DataContext";
import "./Metrolink.scss";

const Metrolink = () => {
  const state = React.useContext(DataContext);
  const data = state.metrolink ? state.metrolink.message : {};

  return (
    <div className="Metrolink">
      <div className="Metrolink__Inner Metrolink__Header">
        <img src="./images/metrolink.jpg" width="300" alt="metrolink logo" />
        <h3 className="Metrolink__Title">Holt Town</h3>
      </div>
      <div className="Metrolink__Inner">
        <TramPlatform title="Inbound" tramData={data.inbound} />
        <TramPlatform title="Outbound" tramData={data.outbound} />
      </div>
      <div className="Metrolink__Inner">
        <span className="Metrolink__Message">{data.message}</span>
        <span className="Metrolink__LastUpdated">
          Last Updated: {data.lastUpdated}
        </span>
      </div>
    </div>
  );
};

const TramPlatform = ({ tramData, title }) => {
  return (
    <div className="Metrolink__Platform">
      <h3>{title}</h3>
      <div className="Metrolink__Trams">
        {!!tramData
          ? tramData.map(tram => {
              return (
                <div
                  className={classnames("Metrolink__Tram", {
                    "Metrolink__Tram--soon": tram.time < 5,
                    "Metrolink__Tram--late": tram.time < 3
                  })}
                  key={`tram-${tram.destination}-${tram.time}`}
                >
                  <div className="Tram__Destination">{tram.destination}</div>
                  <div className="Tram__Time">
                    {tram.time === 0 ? "arrv" : `${tram.time} mins`}
                  </div>
                </div>
              );
            })
          : "Awaiting LIVE tram times..."}
      </div>
    </div>
  );
};

export default Metrolink;
