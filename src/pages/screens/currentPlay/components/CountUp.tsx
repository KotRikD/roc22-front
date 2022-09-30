import React, { useEffect } from 'react';
import { useCountUp } from 'react-countup';

interface CountUpProps {
	value: number;
	duration: number;
	separator?: string;
}

export const CountUp: React.FC<CountUpProps> = (props) => {
	const countUpRef = React.useRef(null);
	const { update } = useCountUp({
		ref: countUpRef,
		start: 0,
		end: 0,
		delay: 0,
		duration: props.duration,
		separator: props.separator ?? ' ',
		useEasing: true
	});

	useEffect(() => {
		update(props.value);
	}, [props.value, update]);

	return <span ref={countUpRef} />;
};
