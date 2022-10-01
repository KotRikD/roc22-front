import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useQuery } from 'react-query';

import { Header } from '@/components/Header';
import { MatchScore } from '@/components/MatchScore';
import { Screen } from '@/components/Screen';
import { ComponentNoizyStuffPlaces, ComponentStructuresPlayerFields } from '@/graphql/__generated__/types';
import { graphqlClient } from '@/graphql/client';
import { CurrentMatchQuery, getSdk } from '@/graphql/queries/CurrentMatch/CurrentMatch.sdk';
import { resolveSharkTeamChatCringe } from '@/pages/screens/MatchPool/mapping';
import { Direction } from '@/utils/Direction';
import { getQueryVariable } from '@/utils/getQueryVariable';
import { usePreviousNonNull } from '@/utils/usePreviousNonNull';

import styles from './index.module.scss';

function calculatePlacesToPoints(places: Array<ComponentNoizyStuffPlaces | null> | null): number {
	if (!places || places.length < 1) return 0;

	let counter = 0;
	places.forEach((place) => {
		if (place?.place === 0) counter += 0;
		if (place?.place === 1) counter += 1;
	});

	return counter;
}

export function getOrdering(reversed: boolean = false): number[] {
	return reversed ? [0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0] : [1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1];
}

export function getPickedMap(
	indexOfMap: number,
	players: ComponentStructuresPlayerFields[],
	reverse: boolean = false
): ComponentStructuresPlayerFields {
	const ordering = getOrdering(reverse);

	return players.at(ordering.at(indexOfMap)!)!;
}

export const MatchPoolVersus: React.FC = () => {
	const [currentMatch, setCurrentMatch] = useState<null | CurrentMatchQuery>(null);
	const [chatEntries, setChatEntries] = useState<any[]>([]);
	const [bestOf, setBestOf] = useState<number>(2);
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
			setBestOf(data.tourney.manager.bestOF);
		};
		if (getQueryVariable('debug') === '1') {
			setChatEntries([
				{ team: 'bot', time: '23:55', name: 'BanchoBot', messageBody: 'Match history available here.' },
				{ team: 'unknown', time: '23:55', name: 'KotRik', messageBody: 'фывдлоаыфдаолвы' },
				{ team: 'unknown', time: '23:55', name: 'KotRik', messageBody: 'ывалдоыволдаы' },
				{ team: 'unknown', time: '23:55', name: 'KotRik', messageBody: 'фыдвлфыволдф' }
			]);
			setBestOf(11);
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
	const players = match.attributes?.players!;
	const reversePicks = players[0]?.roll! < players[1]?.roll!;
	const ordering = getOrdering(reversePicks);

	// @ts-ignore
	const playersSorted = [...players]
		// @ts-ignore
		.map((player, index) => {
			const playerProtectedMaps = (player!.protected_map_vs || '').split(',');
			const protectedMap = match.attributes?.match_pool?.data?.attributes?.maps?.find(
				(map) => map!.map_id === Number(playerProtectedMaps[0])
			);
			const protectedMapSecond = match.attributes?.match_pool?.data?.attributes?.maps?.find(
				(map) => map!.map_id === Number(playerProtectedMaps[1])
			);
			const bannedMap = match.attributes?.match_pool?.data?.attributes?.maps?.find(
				(map) => map!.map_id === player!.bans?.at(0)?.map_id
			);
			const bannedMapSecond = match.attributes?.match_pool?.data?.attributes?.maps?.find(
				(map) => map!.map_id === player!.bans?.at(1)?.map_id
			);

			return (
				<div className={styles.boxes_player}>
					<div className={`${styles.player_bans} ${index === 1 ? styles.player_bans_bans_reverse : ''}`}>
						<div className={styles.player_ban_blue}>
							<span>
								{protectedMap
									? `${protectedMap.mode_combination}: ${poolData[protectedMap.map_id].beatmapset.title}`
									: '???'}
							</span>
						</div>
						<div className={styles.player_ban_blue}>
							<span>
								{protectedMapSecond
									? `${protectedMapSecond.mode_combination}: ${poolData[protectedMapSecond.map_id].beatmapset.title}`
									: '???'}
							</span>
						</div>
						<div className={styles.player_ban_red}>
							<span>
								{bannedMap ? `${bannedMap.mode_combination}: ${poolData[bannedMap.map_id].beatmapset.title}` : '???'}
							</span>
						</div>
						<div className={styles.player_ban_red}>
							<span>
								{bannedMapSecond
									? `${bannedMapSecond.mode_combination}: ${poolData[bannedMapSecond.map_id].beatmapset.title}`
									: '???'}
							</span>
						</div>
					</div>
					<div className={`${styles.player} ${index === 1 ? styles.player_reverse : ''}`}>
						<div className={styles.player_ava_holder}>
							<div
								className={styles.player_avatar}
								style={{
									backgroundImage: `url("https://a.ppy.sh/${player!.osu_id}")`
								}}
							/>
							<div className={`${styles.player_roll} ${index === 1 ? styles.player_roll_reverse : ''}`}>
								<span>!roll</span>
								<span>{player!.roll ?? '???'}</span>
							</div>
						</div>
						<div className={styles.player_name}>{player!.osu_name}</div>
						<div>
							<MatchScore
								bestOf={bestOf}
								currentScore={calculatePlacesToPoints(player!.places as never)}
								direction={index === 1 ? Direction.Right : Direction.Left}
							/>
						</div>
					</div>
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

	const renderMapFeed = (playerIndex: number) =>
		match.attributes?.picks?.map((pick, index) => {
			if (ordering[index] === 3 && Number(reversePicks) !== playerIndex) {
				return <div key={index} className={styles.pick_empty} />;
			}
			if (ordering[index] !== playerIndex && ordering[index] !== 3) {
				return null;
			}
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
					</div>
				</div>
			);
		});

	const firstPlayerFeed = renderMapFeed(0);
	const secondPlayerFeed = renderMapFeed(1);

	const renderEmpty = (count: number) =>
		Math.round(bestOf / 2) - count > 0
			? Array.from(Array(Math.round(bestOf / 2) - count).keys()).map((_, index) => <div key={index} className={styles.pick_empty} />)
			: null;

	return (
		<Screen>
			<Header customTextStart={`Lobby ${match.attributes?.lobby_id}`} />
			<div className={styles.boxes}>
				{playersSorted[0]}

				<div className={styles.boxes_maps}>
					<div className={styles.picks_holder}>
						<div className={styles.picks}>
							{renderMapFeed(0)}
							{renderEmpty(firstPlayerFeed!.filter((val) => val !== null).length)}
						</div>
						<div className={styles.picks}>
							{renderMapFeed(1)}
							{renderEmpty(secondPlayerFeed!.filter((val) => val !== null).length)}
						</div>
					</div>
					<div>
						<div className={styles.chat} ref={chatRef}>
							{renderChatEntries()}
						</div>
						<div className={styles.xppenGirl} />
					</div>
				</div>

				{playersSorted[1]}
			</div>
		</Screen>
	);
};
