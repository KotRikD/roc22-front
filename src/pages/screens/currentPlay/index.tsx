import React, { useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query';

import { Header } from '@/components/Header';
import { Screen } from '@/components/Screen';
import { graphqlClient } from '@/graphql/client';
import { CurrentMatchQuery, getSdk } from '@/graphql/queries/CurrentMatch/CurrentMatch.sdk';
import { CountUp } from '@/pages/screens/currentPlay/components/CountUp';
import { getQueryVariable } from '@/utils/getQueryVariable';
import { usePreviousNonNull } from '@/utils/usePreviousNonNull';

import styles from './currentPlay.module.scss';
import './odometer.scss';

export function getBPM(bpmStruct: any): string {
	if (bpmStruct.min === bpmStruct.max) return bpmStruct.max;

	return `${bpmStruct.min}~${bpmStruct.max}`;
}

export const CurrentPlay: React.FC = () => {
	const [state, setState] = useState<any>(null);

	/*
        Короче, давай попробую объяснить что такое useEffect и почему он здесь нужен
        В реакте useEffect, нужен для того, чтобы выполнять любой side effect,
        в обычном js очень сильно можно сравнить с setTimeout, но так как реакт реактивен,
        а значит может обновлять своё состояние 500 миллионов раз в секунду,
        setTimeout нам не подходит.

        Соответственно, useEffect здесь будет вызван один раз, при первом вызове компонента
    */
	const [currentMatch, setCurrentMatch] = useState<null | CurrentMatchQuery>(null);

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

	useEffect(() => {
		// @ts-ignore
		const callback = (data) => {
			setState(data);
		};
		window.GOSU.on('data', callback);

		// Здесь я очищаю компонент от слушателя data, аналог в обычном js - clearTimeout(callback)
		return () => {
			console.log("[Current Play] Callback 'data' removed");
			window.GOSU.removeListener('data', callback);
		};
	}, []);
	// "один раз" вызов компонента обеспечивается здесь, вторым аргументом
	// иначе мы бы на каждый перерендер страницы, добавляли бы callback :)
	// более подробно можно почитать на доке реакта

	if (state === null || !poolData || poolData === null || !currentMatch?.matches || currentMatch.matches.data.length < 1) return null;

	if (error) return <>Не удалось загрузить пул!</>;

	const match = currentMatch.matches.data.at(0)!;
	const group = `GROUP ${match.attributes?.lobby_id}`;

	const backendVariable = getQueryVariable('backend');
	const hostBackend = new URL(backendVariable || '').host;

	const pathToImage = state.menu.bm.path.full.replace(/#/g, '%23').replace(/%/g, '%25').replace(/\\/g, '/');
	const backgroundStyle = {
		backgroundImage: `url('http://${hostBackend}/Songs/${pathToImage}')`
	};

	const mapTitle = `${state.menu.bm.metadata.title}`;
	const mapArtist = `${state.menu.bm.metadata.artist}`;
	const mapDifficulty = `${state.menu.bm.metadata.difficulty}`;
	const mapMapper = `${state.menu.bm.metadata.mapper}`;
	const mapCS = `${state.menu.bm.stats.CS.toFixed(1)}`;
	const mapAR = `${state.menu.bm.stats.AR.toFixed(1)}`;
	const mapOD = `${state.menu.bm.stats.OD.toFixed(1)}`;
	const mapBPM = getBPM(state.menu.bm.stats.BPM);
	const mapSR = `${state.menu.bm.stats.SR}*`;
	const mapID = `${state.menu.bm.id}`;

	const map = poolData[state.menu.bm.id] || { id: 0 };
	const poolMap = match.attributes?.match_pool?.data?.attributes?.maps?.find((mapd) => mapd?.map_id === map.id);

	const playerArray = Object.values(state.tourney.ipcClients).filter((ipcClient) => Boolean((ipcClient as any).spectating.name));
	const sortedPlayerArray = Object.values(state.tourney.ipcClients)
		// @ts-ignore
		.sort((playerA, playerB) => (playerA.gameplay.score > playerB.gameplay.score ? -1 : 1));

	const scoreGaps = {} as any;
	sortedPlayerArray.forEach((player, index) => {
		const currentScore = (player as any).gameplay.score;
		const gap = index === 0 ? 0 : currentScore - (sortedPlayerArray.at(index - 1) as any).gameplay.score;

		scoreGaps[(player as any).spectating.userID] = [gap, index];
	});

	const colors = ['#0066ff', '#ff0000', '#ffd600', '#05ff00'];

	const ColorMassive = {} as any;
	playerArray.forEach((player, index) => {
		ColorMassive[(player as any).spectating.userID] = colors[index];
	});

	const renderedPlayers = playerArray.map((player, index) => {
		const currentScore = (player as any).gameplay.score;
		const gap = scoreGaps[(player as any).spectating.userID][0];
		return (
			<div
				key={index}
				className={styles.playerSlot}
				style={{
					transform: `translateY(${scoreGaps[(player as any).spectating.userID][1] * 60}px)`
				}}
			>
				<div className={styles.wrap} style={{ backgroundImage: `url('https://a.ppy.sh/${(player as any).spectating.userID}')` }} />
				<div
					className={styles.avatar}
					style={{ backgroundImage: `url('https://a.ppy.sh/${(player as any).spectating.userID}')` }}
				/>
				<div className={styles.slotColor} style={{ background: ColorMassive[(player as any).spectating.userID] }} />
				<div className={styles.playerName}>{(player as any).spectating.name}</div>
				<div
					className={styles.gap}
					style={{
						visibility: gap === 0 ? 'hidden' : 'visible'
					}}
				>
					gap
				</div>
				<div
					className={styles.scoreBetween}
					style={{
						visibility: gap === 0 ? 'hidden' : 'visible'
					}}
				>
					<CountUp duration={1} value={gap as number} />
				</div>
				<div className={styles.scoreText}>score</div>
				<div className={styles.playerScore}>
					<CountUp duration={0.5} value={currentScore as number} />
				</div>
			</div>
		);
	});

	/*
        Теперь всё состояние у нас доступно в переменной state, с которой мы вольны творить что угодно
    */
	return (
		<Screen>
			<Header customTextStart={group} />
			<div className={styles.main}>
				<div className={styles.mapContainer} style={backgroundStyle}>
					<div className={styles.overlay}>
						<div className={styles.mapCurrent}>
							{poolMap ? (
								<>
									<div className={styles.mapSection}>{poolMap?.mode_combination.slice(0, 2)}</div>
									<div className={styles.mapSection}>{poolMap?.mode_combination.slice(2, 3)}</div>
								</>
							) : (
								<>
									<div className={styles.mapSection} />
									<div className={styles.mapSection} />
								</>
							)}
						</div>
						<div className={styles.mapInfo}>
							<div className={styles.mapInfoItem}>
								<span className={styles.mapInfoTitle}>{mapTitle}</span>
								<span className={styles.mapInfoArtist}>{mapArtist}</span>
							</div>

							<div className={styles.mapInfoFooter}>
								<div className={styles.mapInfoItemRow}>
									<div className={styles.stat}>
										<span className={styles.statTitle}>Difficulty</span>
										<span className={styles.statText}>{mapDifficulty}</span>
									</div>
									<div className={styles.stat}>
										<span className={styles.statTitle}>Mapper</span>
										<span className={styles.statText}>{mapMapper}</span>
									</div>
								</div>
								<div className={styles.mapInfoItemRow}>
									<div className={styles.mapStats}>
										<div className={styles.stat}>
											<span className={styles.statTitle}>CS</span>
											<span className={styles.statText}>{mapCS}</span>
										</div>
										<div className={styles.stat}>
											<span className={styles.statTitle}>AR</span>
											<span className={styles.statText}>{mapAR}</span>
										</div>
										<div className={styles.stat}>
											<span className={styles.statTitle}>OD</span>
											<span className={styles.statText}>{mapOD}</span>
										</div>
										<div className={styles.stat}>
											<span className={styles.statTitle}>BPM</span>
											<span className={styles.statText}>{mapBPM}</span>
										</div>
										<div className={styles.stat}>
											<span className={styles.statTitle}>SR</span>
											<span className={styles.statText}>{mapSR}</span>
										</div>
									</div>
									<div className={styles.stat}>
										<span className={styles.statTitle}>Beatmap ID</span>
										<span className={styles.statText}>{mapID}</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className={styles.scoreWall} />
				<div className={styles.xpLogo} />
				<div className={styles.bottom}>{renderedPlayers}</div>
			</div>
		</Screen>
	);
};
