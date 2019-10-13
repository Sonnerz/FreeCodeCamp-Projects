import React from 'react';

const Session = props => {
  return (
    <div>
      <button
        onClick={() => props.onIncrement(props.type)}
        id="session-increment"
        disabled={
          props.sessionRunning
          && !props.paused}
      >
        <i className="fa fa-arrow-up fa-2x" aria-hidden="true" />
      </button>

      <div id="session-label">Session Length</div>
      <div id="session-length">{props.session / 60}</div>

      <button
        onClick={() => props.onDecrement(props.type)}
        id="session-decrement"
        disabled={props.sessionRunning
          && !props.paused}
      >
        <i className="fa fa-arrow-down fa-2x" aria-hidden="true" />
      </button>
    </div>
  );
};

export default Session;