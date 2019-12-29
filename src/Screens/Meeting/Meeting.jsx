import React from "react";
import "./Meeting.scss";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
const Meeting = () => {
  const firstMondayOfMonth = (year, month) => {
    let toReturn;
    [1, 2, 3, 4, 5, 6, 7].map(day => {
      const dateStr = `${year}-${month + 1 < 10 ? "0" : ""}${month +
        1}-0${day}`;
      const thisDay = new Date(dateStr);
      if (thisDay.getDay() === 1) toReturn = day;
    });
    return toReturn;
  };

  const now = new Date();
  const meetingMonths = [0, 2, 4, 6, 8, 10];
  const thisMonth = now.getMonth();
  const firstMondayOfThisMonth = firstMondayOfMonth(
    now.getFullYear(),
    now.getMonth()
  );

  //Get all meetings this and next year
  const meetings = [];
  meetingMonths.map(m => {
    const dateStr = `${now.getFullYear()}-${m < 10 ? "0" : ""}${m +
      1}-0${firstMondayOfMonth(now.getFullYear(), m)}`;
    meetings.push(new Date(dateStr));
  });
  meetingMonths.map(m => {
    const dateStr = `${now.getFullYear() + 1}-${m < 10 ? "0" : ""}${m +
      1}-0${firstMondayOfMonth(now.getFullYear() + 1, m)}`;
    meetings.push(new Date(dateStr));
  });

  let nextMeeting = meetings.filter(m => m >= now)[0];
  let postfix = "th";
  const lastDigit = nextMeeting
    .getDate()
    .toString()
    .split()[nextMeeting.getDate().toString().length - 1];

  switch (lastDigit) {
    case "1":
      postfix = "st";
      break;
    case "2":
      postfix = "nd";
      break;
    case "3":
      postfix = "rd";
      break;
  }
  return (
    <div className="Meeting">
      <div className="Meeting__Next">
        <h3>The next members' meeting will be on:</h3>

        <div className="Meeting__Date">
          {days[nextMeeting.getDay()]} {nextMeeting.getDate()}
          {postfix} {months[nextMeeting.getMonth()]}
        </div>
        <h3>at 7pm</h3>
        <div className="Meeting__Pattern">
          First Monday, every other month, starting January.
        </div>
      </div>
    </div>
  );
};
export default Meeting;
