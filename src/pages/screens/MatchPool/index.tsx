import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useQuery } from 'react-query';

import { Header } from '@/components/Header';
import { Screen } from '@/components/Screen';
import { ComponentNoizyStuffPlaces, ComponentStructuresPlayerFields } from '@/graphql/__generated__/types';
import { graphqlClient } from '@/graphql/client';
import { CurrentMatchQuery, getSdk } from '@/graphql/queries/CurrentMatch/CurrentMatch.sdk';
import { resolveSharkTeamChatCringe } from '@/pages/screens/MatchPool/mapping';
import { getQueryVariable } from '@/utils/getQueryVariable';
import { usePreviousNonNull } from '@/utils/usePreviousNonNull';

import styles from './index.module.scss';

function calculatePlacesToPoints(places: Array<ComponentNoizyStuffPlaces | null> | null): number {
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

export function getPickedMap(indexOfMap: number, players: ComponentStructuresPlayerFields[]): ComponentStructuresPlayerFields {
	const ordering = [0, 1, 2, 3, 3, 2, 1, 0, 3];

	return players.at(ordering.at(indexOfMap)!)!;
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

	const { error, data: poolDataRaw } = useQuery(
		[`currentPool`, currentMatch],
		() =>
			fetch(`https://roc22-admin.kotworks.cyou/bmproxy/pool/${currentMatch!.matches!.data[0].attributes!.proxy_pool_id}`).then(
				(res) => res.json()
			),
		{
			enabled: !!currentMatch
		}
	);

	const previousPoolData = usePreviousNonNull(poolDataRaw);
	const poolData = useMemo(() => {
		if (poolDataRaw === undefined) {
			return previousPoolData;
		}

		return poolDataRaw;
	}, [poolDataRaw, previousPoolData]);

	if (currentMatch === null || !poolData) {
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
	const picks = match.attributes?.picks!;

	const placesMap = new Map()
		.set(1, [styles.player_matchProgression_green, '59px'])
		.set(2, [styles.player_matchProgression_yellow, '41px'])
		.set(3, [styles.player_matchProgression_red, '29px'])
		.set(4, [styles.player_matchProgression_blue, '18px']);

	const renderPlaces = (places: ComponentNoizyStuffPlaces[]) =>
		places.map((place, index) => {
			const picksMap = picks.at(index)!.map_id;
			const beatmapset = poolData[picksMap].beatmapset;
			const [placeStyle, placeWidth] = placesMap.get(place.place)!;

			return (
				<div
					className={`${styles.player_matchProgression_matchPick} ${placeStyle}`}
					style={{
						width: placeWidth,
						backgroundImage: `url('https://assets.ppy.sh/beatmaps/${beatmapset.id}/covers/cover@2x.jpg')`
					}}
				/>
			);
		});

	// @ts-ignore
	const playersSorted = [...players]
		// @ts-ignore
		.sort((player1, player2) => (calculatePlacesToPoints(player1.places) < calculatePlacesToPoints(player2.places) ? 1 : -1))
		// @ts-ignore
		.map((player, index) => {
			const protectedMap = match.attributes?.match_pool?.data?.attributes?.maps?.find((map) => map!.map_id === player!.protected_map);
			const bannedMap = match.attributes?.match_pool?.data?.attributes?.maps?.find(
				(map) => map!.map_id === player!.bans?.at(0)?.map_id
			);
			return (
				<div className={styles.player} key={index}>
					<div className={styles.player_roll}>
						<span>!roll</span>
						<span>{player!.roll ?? '???'}</span>
					</div>
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
					<div className={styles.player_matchProgression}>{renderPlaces(player!.places as never)}</div>
					<div className={styles.player_counterOutline}>{calculatePlacesToPoints(player!.places as never)}</div>
				</div>
			);
		});

	const renderChatEntries = () =>
		chatEntries
			? chatEntries.map((val, ind) => (
					<React.Fragment key={ind}>
						<span className={styles.chat_time}>{val.time}&nbsp;&nbsp;&nbsp;</span>
						<span className={styles[`chat_${resolveSharkTeamChatCringe(val.team)}`]}>{val.name}:&nbsp;</span>
						<span>{val.messageBody}</span>
						<br />
					</React.Fragment>
			  ))
			: null;

	const renderMapFeed = () =>
		match.attributes?.picks?.map((pick, index) => {
			const map = poolData[pick!.map_id];
			const poolMap = match.attributes?.match_pool?.data?.attributes?.maps?.find((mapd) => mapd?.map_id === map.id);
			const modeCombination = poolMap?.mode_combination.slice(0, 2) || 'NOT_DEFINED_MODS';

			return (
				<div
					className={styles.pick_filled}
					style={{
						backgroundImage: `url('https://assets.ppy.sh/beatmaps/${map.beatmapset.id}/covers/cover@2x.jpg')`
					}}
					key={index}
				>
					<div className={styles.pick_filled_fade}>
						<div className={styles.pick_filled_left}>
							<div className={`${styles.pick_filled_card} ${styles[modeCombination]}`}>
								<div className={styles.pick_filled_card_title}>{modeCombination}</div>
								<div className={styles.pick_filled_card_version}>{poolMap?.mode_combination.slice(2, 3)}</div>
							</div>
							<div className={styles.pick_filled_left_description}>
								<span className={styles.pick_filled_left_description_title}>{map.beatmapset.title}</span>
								<span className={styles.pick_filled_left_description_subtitle}>{map.beatmapset.artist}</span>
							</div>
						</div>
						<div className={styles.pick_filled_right}>
							<span>
								<span className={`${styles.pick_filled_right_littleSpan} ${styles[modeCombination]}`}>PICKED BY</span>{' '}
								{getPickedMap(index, players as never).osu_name}
							</span>
							<span>
								<span className={`${styles.pick_filled_right_littleSpan} ${styles[modeCombination]}`}>BEATMAP ID</span>{' '}
								{map.id}
							</span>
						</div>
					</div>
				</div>
			);
		});

	const emptyCount = Array.from(Array(9 - match.attributes?.picks?.length!).keys());
	const renderEmpty = () =>
		9 - match.attributes?.picks?.length! > 0
			? emptyCount.map((_, index) => (
					<div key={index} className={styles.pick_empty}>
						{emptyCount.length - 1 === index ? 'TB' : getPickedMap(8 - (index + 1), players as never).osu_name + '’s Pick'}
					</div>
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
				<div className={styles.picks}>
					{renderMapFeed()}
					{renderEmpty()}
				</div>
			</div>
		</Screen>
	);
};
