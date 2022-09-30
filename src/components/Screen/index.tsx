import React, { PropsWithChildren } from 'react';

import rocBG from '@/assets/rocbackground.webm';

import styles from './index.module.scss';

interface IProps extends React.HTMLAttributes<HTMLDivElement>, PropsWithChildren {}

export const Screen: React.FC<IProps> = (props) => {
	return (
		<div className={styles.Screen} {...props}>
			{props.children}
			<video
				src={rocBG}
				autoPlay
				loop
				muted
				style={{
					position: 'absolute',
					top: 0,
					zIndex: -1
				}}
			/>
		</div>
	);
};
