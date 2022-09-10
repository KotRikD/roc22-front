import React from 'react';
import { useTimer } from 'react-timer-hook';

export interface ScheduleTimerProps {
	seconds: number;
	endText: string;
}

export const ScheduleTimer: React.FC<ScheduleTimerProps> = (props) => {
	const { minutes, seconds, isRunning } = useTimer({
		expiryTimestamp: new Date(new Date().getTime() + props.seconds * 1000),
		onExpire: () => console.log('[ScheduleTimer] end~!')
	});

	if (!isRunning) {
		return <>{props.endText ?? 'Timer expired'}</>;
	}

	return (
		<>
			{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
		</>
	);
};
