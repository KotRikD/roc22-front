import React, { FC } from 'react';

import styles from './index.module.scss';

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
	width?: string;
	height?: string;
}

const XpLogo: FC<IProps> = (props) => {
	const style: any = {};

	if (props.width) {
		style.width = props.width;
	}

	if (props.height) {
		style.height = props.height;
	}

	return <div {...props} style={style} className={styles.xpLogo}></div>;
};

export default XpLogo;
