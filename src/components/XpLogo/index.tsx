import React, { FC } from 'react';

import styles from './index.module.scss';

interface IProps extends React.HTMLAttributes<HTMLDivElement> {}

const XpLogo: FC<IProps> = (props) => {
	return <div {...props} className={styles.xpLogo}></div>;
};

export default XpLogo;
