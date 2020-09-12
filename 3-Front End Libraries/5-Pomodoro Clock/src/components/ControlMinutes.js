import React from 'react';

const ControlMinutes = props => {
  return (
    <div>

      <div style={{ textTransform: 'capitalize' }}
        id={props.type + "-label"}>{props.type} Length</div>

      <div className="length-control">

        <div className="arrow-button">
          <button
            className={props.sessionRunning ? "disabled" : null}
            onClick={(e) => props.onIncrement(e)}
            id={props.type + "-increment"}
            disabled={props.sessionRunning && !props.paused}>
            <i className="fa fa-arrow-up fa-2x" aria-hidden="true" />
          </button>
        </div>

        <div id={props.type + "-length"}>{props.session / 60}</div>

        <div className="arrow-button">
          <button
            className={props.sessionRunning ? "disabled" : null}
            onClick={(e) => props.onDecrement(e)}
            id={props.type + "-decrement"}
            disabled={props.sessionRunning && !props.paused}>
            <i className="fa fa-arrow-down fa-2x" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ControlMinutes;