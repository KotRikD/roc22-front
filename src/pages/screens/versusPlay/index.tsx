import React from 'react';

import { Header } from '@/components/Header';
import { Screen } from '@/components/Screen';
import VersusPlayer from '@/pages/screens/versusPlay/VersusPlayer';
import { Direction } from '@/utils/Direction';

import './index.scss';

export const VersusPlay = () => {
	return (
		<Screen
			style={{
				display: 'flex',
				flexDirection: 'column'
			}}
		>
			<Header customTextStart={''} />
			<div className="green-screen">
				<div className="greenScreen__left"></div>
				<div className="greenScreen__right"></div>
			</div>
			<div className="versus-footer">
				<VersusPlayer
					direction={Direction.Left}
					nickname={'TheEZIC'}
					avatarUrl={'https://a.ppy.sh/6984567?1643483765.jpeg'}
					leader={true}
					bestOf={11}
					currentScore={1727727}
					currentMatchScore={2}
				/>
				<div className="versus-center"></div>
				<VersusPlayer
					direction={Direction.Right}
					nickname={'TheEZIC'}
					avatarUrl={''}
					leader={false}
					bestOf={11}
					currentScore={727727}
					currentMatchScore={2}
				/>
			</div>
		</Screen>
	);
};
