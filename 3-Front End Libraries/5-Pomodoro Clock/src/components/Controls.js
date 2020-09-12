import React from 'react';

const Controls = props => {
  return (
    <div>
      {props.paused
        ? <button onClick={(e) => props.onControlClick(e)} id="start_stop">
          <i className="fa fa-play-circle fa-2x" aria-hidden="true"></i>
        </button>
        : <button onClick={(e) => props.onControlClick(e)} id="start_stop">
          <i className="fa fa-pause-circle fa-2x" aria-hidden="true"></i>
        </button>}
      <button onClick={(e) => props.onControlClick(e)} id="reset">
        <i className="fa fa-refresh fa-2x" aria-hidden="true"></i>
      </button>
    </div>
  );
};

export default Controls;

