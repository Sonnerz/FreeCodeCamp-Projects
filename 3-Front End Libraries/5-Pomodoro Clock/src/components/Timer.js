import React from 'react';

const Timer = props => {
  let minutes, seconds

  if (props.sessionType === "session") {
    minutes = parseInt(props.userSession / 60, 10);
    seconds = parseInt(props.userSession % 60, 10);
  } else if (props.sessionType === "break") {
    minutes = parseInt(props.userBreak / 60, 10);
    seconds = parseInt(props.userBreak % 60, 10);
  }

  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return (
    <div id="time-left">
      {minutes + ":" + seconds}
    </div>
  )

};

export default Timer;