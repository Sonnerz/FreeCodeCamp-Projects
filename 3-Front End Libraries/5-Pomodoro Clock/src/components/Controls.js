import React from 'react';

const controlClick = (props, event) => {
  props.onControlClick(event.currentTarget.id)
}

const Controls = props => {
  return (
    <div>
      {props.paused
        ? <button onClick={(e) => controlClick(props, e)} id="start_stop">
          <i className="fa fa-play-circle fa-2x" aria-hidden="true"></i>
          play
        </button>
        : <button onClick={(e) => controlClick(props, e)} id="start_stop">
          <i className="fa fa-pause-circle fa-2x" aria-hidden="true"></i>
          pause
        </button>}
      <button onClick={(e) => controlClick(props, e)} id="reset">
        <i className="fa fa-refresh fa-2x" aria-hidden="true"></i>
      </button>
    </div>
  );
};

export default Controls;

