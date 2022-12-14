import React from 'react';

import styles from './index.module.scss';

export interface PropsHeader {
	customTextStart: string | React.ReactNode;
	customOverrideTextEnd?: string;
}

export const Header: React.FC<PropsHeader> = (props) => {
	return (
		<div className={styles.container}>
			<div>{props.customTextStart}</div>
			<div>{props.customOverrideTextEnd ?? '#roc22'}</div>
		</div>
	);
};
