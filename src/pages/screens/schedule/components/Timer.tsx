import React from 'react';
import { useTimer } from 'react-timer-hook';

export interface ScheduleTimerProps {
	seconds: number;
	endText: string;
}

export const ScheduleTimer: React.FC<ScheduleTimerProps> = (props) => {
	const { minutes, seconds, hours, isRunning } = useTimer({
		expiryTimestamp: new Date(new Date().getTime() + props.seconds * 1000),
		onExpire: () => console.log('[ScheduleTimer] end~!')
	});

	if (!isRunning) {
		return <>{props.endText ?? 'Timer expired'}</>;
	}

	const renderedHours = hours > 0 ? String(hours).padStart(2, '0') + ':' : '';
	return (
		<>
			{renderedHours}
			{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
		</>
	);
};
