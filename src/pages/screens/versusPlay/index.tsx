import React from 'react';

import { Header } from '@/components/Header';
import { Screen } from '@/components/Screen';
import XpLogo from '@/components/XpLogo';
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
				<div className="green-screen__left"></div>
				<div className="green-screen__right"></div>
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
				<div className="versus-center">
					<XpLogo width={'100%'} height={'85px'} />
				</div>
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
