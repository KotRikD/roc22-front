import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';

import { Header } from '@/components/Header';
import { Screen } from '@/components/Screen';
import { ComponentStructuresPlayerFields } from '@/graphql/__generated__/types';
import { graphqlClient } from '@/graphql/client';
import { MatchQueryQuery, getSdk } from '@/graphql/queries/MatchQuery/MatchQuery.sdk';
import { ScheduleTimer } from '@/pages/screens/schedule/components/Timer';
import { getQueryVariable } from '@/utils/getQueryVariable';

import styles from './index.module.scss';

export const Schedule: React.FC = () => {
	const [allMatches, setAllMatches] = useState<null | MatchQueryQuery>(null);

	useEffect(() => {
		const sdk = getSdk(graphqlClient);

		sdk.MatchQuery({
			filter: {
				// @ts-ignore
				date_start: {
					gte: new Date().toISOString()
				}
			},
			// @ts-ignore
			pagination: {
				limit: 8
			}
		})
			.then((data) => setAllMatches(data))
			.catch(() => console.error("[GQL] can't ask for all matches"));
	}, []);

	if (!allMatches || !allMatches.matches || allMatches.matches.data.length < 1) return null;

	const anyMatchStage = String(allMatches.matches.data[0].attributes?.stage);
	const todayIs = format(new Date(), 'eeee');

	const renderPlayers = (player: ComponentStructuresPlayerFields) => (
		<div className={styles.avatar} key={player.osu_id}>
			<div className={styles.avatar_name}>{player.osu_name}</div>
			<div
				className={styles.avatar_img}
				style={{
					backgroundImage: `url("https://a.ppy.sh/${player.osu_id}")`
				}}
			/>
		</div>
	);

	const renderGroups = allMatches.matches.data.map((match) => (
		<div className={styles.card} key={match.attributes?.lobby_id}>
			<div className={styles.card_info}>
				<div className={styles.card_name}>
					{match.attributes?.matchType === 'VERSUS' ? 'Lobby' : 'Group'}{' '}
					<span className={styles.card_lightName}>{match.attributes?.lobby_id}</span>
				</div>
				<div className={styles.card_time}>
					<span className={styles.card_lightName}>
						{new Date(match.attributes?.date_start).toLocaleTimeString('ru-RU', {
							hour: '2-digit',
							minute: '2-digit',
							timeZone: 'Europe/Moscow'
						})}
					</span>{' '}
					MSK
				</div>
			</div>
			<div className={styles.avatars}>
				{
					// @ts-ignore
					match.attributes!.players!.map((player) => renderPlayers(player))
				}
			</div>
		</div>
	));

	let timerSeconds = 0;
	const someLiveMatch = allMatches.matches.data.find((match) => match!.attributes!.is_active_match);
	const queryTimerValue = getQueryVariable('timer');
	if (queryTimerValue) {
		timerSeconds = Number(queryTimerValue);
	} else if (someLiveMatch) {
		const startDate = new Date(someLiveMatch.attributes?.date_start).valueOf();
		const liveTime = Date.now();
		timerSeconds = startDate > liveTime ? Math.floor((startDate - liveTime) / 1000) : 0;
	}
	const timer = <ScheduleTimer seconds={timerSeconds} endText="LIVE!" />;

	return (
		<Screen>
			<Header customTextStart={timer} />
			<div className={styles.header}>
				ROC22 - {anyMatchStage} - {todayIs}
			</div>
			<div className={styles.cards}>{renderGroups}</div>
			<div className={styles.xpPenHolder}>
				<div className={styles.scheduleXpPenWithROC} />
			</div>
		</Screen>
	);
};
