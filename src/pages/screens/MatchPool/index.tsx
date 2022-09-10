import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';

import { Header } from '@/components/Header';
import { Screen } from '@/components/Screen';
import { ComponentNoizyStuffPlaces } from '@/graphql/__generated__/types';
import { graphqlClient } from '@/graphql/client';
import { CurrentMatchQuery, getSdk } from '@/graphql/queries/CurrentMatch/CurrentMatch.sdk';
import { getQueryVariable } from '@/utils/getQueryVariable';

import styles from './index.module.scss';

export function calculatePlacesToPoints(places: Array<ComponentNoizyStuffPlaces | null> | null): number {
	if (!places || places.length < 1) return 0;

	let counter = 0;
	places.forEach((place) => {
		if (place?.place === 1) counter += 10;
		if (place?.place === 2) counter += 7;
		if (place?.place === 3) counter += 5;
		if (place?.place === 4) counter += 3;
		if (place?.place === 5) counter += 0;
	});

	return counter;
}

export const MatchPool: React.FC = () => {
	const [currentMatch, setCurrentMatch] = useState<null | CurrentMatchQuery>(null);
	const [chatEntries, setChatEntries] = useState<any[]>([]);
	const chatRef = useRef<HTMLDivElement>(null);

	useEffect(() => chatRef.current?.scrollTo(0, chatRef.current.scrollHeight), [chatEntries]);

	const sdk = getSdk(graphqlClient);

	useEffect(() => {
		const pollTask = () =>
			sdk
				.CurrentMatch()
				.then((data) => setCurrentMatch(data))
				.catch(() => console.error("[GQL] can't ask for all matches"));
		setInterval(pollTask, 1000);

		// @ts-ignore
		return () => clearInterval(pollTask);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		// @ts-ignore
		const callback = (data) => {
			setChatEntries(data.tourney.manager.chat);
		};
		if (getQueryVariable('debug') === '1') {
			setChatEntries([
				{ team: 'bot', time: '23:55', name: 'BanchoBot', messageBody: 'Match history available here.' },
				{ team: 'unknown', time: '23:55', name: 'KotRik', messageBody: 'фывдлоаыфдаолвы' },
				{ team: 'unknown', time: '23:55', name: 'KotRik', messageBody: 'ывалдоыволдаы' },
				{ team: 'unknown', time: '23:55', name: 'KotRik', messageBody: 'фыдвлфыволдф' }
			]);
		} else {
			window.GOSU.on('data', callback);
		}

		// Здесь я очищаю компонент от слушателя data, аналог в обычном js - clearTimeout(callback)
		return () => {
			console.log("[Match Pool] Callback 'data' removed");
			window.GOSU.removeListener('data', callback);
		};
	}, []);

	const {
		isLoading,
		error,
		data: poolData
	} = useQuery(
		[`currentPool`, currentMatch],
		() =>
			fetch(`https://roc22-admin.kotworks.cyou/bmproxy/pool/${currentMatch!.matches!.data[0].attributes!.proxy_pool_id}`).then(
				(res) => res.json()
			),
		{
			enabled: !!currentMatch
		}
	);

	if (currentMatch === null || isLoading) {
		return <Screen />;
	}

	if (!currentMatch.matches?.data || currentMatch.matches.data.length < 1) {
		return (
			<Screen>
				<Header customTextStart="Match is not available!" />
			</Screen>
		);
	}

	if (error || 'error' in poolData) {
		return (
			<Screen>
				<Header customTextStart="Pool is not available!" />
			</Screen>
		);
	}

	const match = currentMatch.matches.data.at(0)!;
	const group = `GROUP ${match.attributes?.lobby_id}`;
	const players = match.attributes?.players!;

	// @ts-ignore
	const playersSorted = players.sort((player1, player2) => calculatePlacesToPoints(player1.places) < calculatePlacesToPoints(player2.places))
		// @ts-ignore
		.map((player, index) => {
			const protectedMap = match.attributes?.match_pool?.data?.attributes?.maps?.find((map) => map!.map_id === player!.protected_map);
			const bannedMap = match.attributes?.match_pool?.data?.attributes?.maps?.find(
				(map) => map!.map_id === player!.bans?.at(0)?.map_id
			);
			return (
				<div className={styles.player}>
					<div
						className={styles.player_avatar}
						style={{
							backgroundImage: `url("https://a.ppy.sh/${player!.osu_id}"`
						}}
					/>
					<div className={styles.player_bans}>
						<div className={styles.player_ban_blue}>{protectedMap ? protectedMap.mode_combination : '??'}</div>
						<div className={styles.player_ban_red}>{bannedMap ? bannedMap.mode_combination : '??'}</div>
					</div>
					<div className={styles.player_matchProgression} />
					<div className={index === 0 ? styles.player_counterFill : styles.player_counterOutline}>
						{calculatePlacesToPoints(player!.places as never)}
					</div>
				</div>
			);
		});

	const renderChatEntries = () =>
		chatEntries
			? chatEntries.map((val, ind) => (
					<React.Fragment key={ind}>
						<span className={styles.chat_time}>{val.time}&nbsp;&nbsp;&nbsp;</span>
						<span className={styles[`chat_${val.team}`]}>{val.name}:&nbsp;</span>
						<span>{val.messageBody}</span>
						<br />
					</React.Fragment>
			  ))
			: null;

	return (
		<Screen>
			<Header customTextStart={group} />
			<div className={styles.boxes}>
				<div className={styles.players}>
					<div className={styles.playersContainer}>{playersSorted}</div>
					<div className={styles.chat} ref={chatRef}>
						{renderChatEntries()}
					</div>
					<div className={styles.xppenGirl} />
				</div>
				<div>Right</div>
			</div>
		</Screen>
	);
};
