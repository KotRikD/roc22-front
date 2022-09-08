import React, {PropsWithChildren} from 'react';
import styles from './index.module.scss';

export const Screen: React.FC<PropsWithChildren> = (props) => {
    return <div className={styles.Screen}>
        {props.children}
    </div>
}