import React from 'react';

const Break = props => {
	return (
		<div>
			<button
				onClick={() => props.onIncrement(props.type)}
				id="break-increment"
				disabled={
					props.sessionRunning
					&& !props.paused}
			>
				<i className="fa fa-arrow-up fa-2x" aria-hidden="true" />
			</button>

			<div id="break-label">Break Length</div>
			<div id="break-length">{props.break / 60}</div>
			<button
				onClick={() => props.onDecrement(props.type)}
				id="break-decrement"
				disabled={
					props.sessionRunning
					&& !props.paused}
			>
				<i className="fa fa-arrow-down fa-2x" aria-hidden="true" />
			</button>
		</div>
	);
};

export default Break;