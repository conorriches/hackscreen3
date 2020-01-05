import React from "react";
import dateformat from "dateformat";
import DataContext from "../../DataContext";
import "./Football.scss";
export default () => {
  const state = React.useContext(DataContext);
  const data = state.football ? state.football : {};

  const showNextEvent = () => {
    if (data.message && data.message[0]) {
      const timeToNextEvent =
        (new Date(data.message[0].start) - Date.now()) / (1000 * 3600 * 24);
      return timeToNextEvent < 28 ? 1 : 0;
    }
    return -1;
  };

  const nextEvent = showNextEvent();

  return (
    <div className="Football">
      <div className="Football__Inner">
        <h2 className="Football__Title">Sportsball</h2>
        {nextEvent === 1 && (
          <div>
            <div className="Football__Detail Football__Detail--header">
              {data.message[0].title}
            </div>
            <div className="Football__Detail Football__Detail--large">
              {dateformat(data.message[0].start, "dd/mm/yyyy")}
            </div>
            <div className="Football__Detail Football__Detail--large">
              {dateformat(data.message[0].start, "HH:MM")} -{" "}
              {dateformat(data.message[0].end, "HH:MM")}
            </div>
            <div className="Football__Detail Football__Detail--Warning">
              Around these times, traffic and trams will be much busier than
              usual and parking will be hard to find.
            </div>
          </div>
        )}
        {nextEvent === 0 && (
          <h3 className="Football__Detail Football__Detail--OK">
            No upcoming Manchester City home games in the next 28 days.
          </h3>
        )}

        {nextEvent === -1 && (
          <h3 className="Football__Detail Football__Detail--Warning">
            Data not available - please check https://fixtur.es for latest
            Manchester City games.
          </h3>
        )}
        <div className="Football__Disclaimer">
          Data provided by https://fixtur.es
        </div>
      </div>
    </div>
  );
};
