import { useEffect, useRef } from 'react';

export const usePreviousNonNull = <T extends unknown>(value: T): T | undefined => {
	const ref = useRef<T>();
	useEffect(() => {
		if (!value) return;

		ref.current = value;
	});
	return ref.current;
};
