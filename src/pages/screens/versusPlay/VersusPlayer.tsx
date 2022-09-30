import React, { FC } from 'react';

import { MatchScore } from '@/components/MatchScore';
import { CountUp } from '@/pages/screens/currentPlay/components/CountUp';
import { Direction } from '@/utils/Direction';

interface IProps {
	direction?: Direction;
	nickname: string;
	avatarUrl: string;
	leader: boolean;
	bestOf: number;
	currentScore: number;
	currentMatchScore: number;
}

const VersusPlayer: FC<IProps> = ({ direction = Direction.Left, nickname, avatarUrl, leader, currentScore, bestOf, currentMatchScore }) => {
	const leaderClass = leader ? 'leader' : '';

	return (
		<div className={`versus-play ${direction}`}>
			<div className="versus-play__header">
				<div className="versus-play__avatar">
					<img src={avatarUrl} alt="avatar" />
				</div>
				<div className="versus-play__info">
					<div className="versus-play__nickname">{nickname}</div>
					<MatchScore bestOf={bestOf} currentScore={currentMatchScore} direction={direction} />
				</div>
			</div>
			<div className={`versus-play__main-score ${leaderClass}`}>
				<CountUp value={currentScore} duration={0.5} separator={','} />
			</div>
		</div>
	);
};

export default VersusPlayer;
