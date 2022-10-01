import React, { FC } from 'react';

import { Direction } from '@/utils/Direction';

import './index.scss';

interface IProps {
	bestOf: number;
	currentScore: number;
	direction?: Direction;
}

export const MatchScore: FC<IProps> = ({ bestOf, currentScore, direction = Direction.Left }) => {
	const renderStar = (index: number) => {
		const activeClass = index + 1 <= currentScore ? 'star__item--active' : '';

		return (
			<div className="star" key={index}>
				{new Array(4).fill(0).map((_, i) => (
					<div key={`star-item-${i}`} className={`star__item ${activeClass} star__item--${i + 1}`} />
				))}
			</div>
		);
	};

	const renderStars = () => {
		return <div className="match-score__stars">{new Array(Math.ceil(bestOf / 2)).fill(0).map((_, i) => renderStar(i))}</div>;
	};

	return (
		<div className={`match-score ${direction}`}>
			<span className="match-score__title">score</span>
			<div className="match-score__stars">{renderStars()}</div>
		</div>
	);
};
