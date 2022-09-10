import React, { useEffect, useMemo, useState } from 'react';

import { Header } from '@/components/Header';
import { Screen } from '@/components/Screen';

import { getQueryVariable } from '@/utils/getQueryVariable';
import './index.css';
import { CountUp } from '@/pages/screens/currentPlay/components/CountUp';
import { CurrentMatchQuery, getSdk } from '@/graphql/queries/CurrentMatch/CurrentMatch.sdk';
import { graphqlClient } from '@/graphql/client';
import { useQuery } from 'react-query';
import { usePreviousNonNull } from '@/utils/usePreviousNonNull';

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

	const {
		error,
		data: poolDataRaw
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

	const previousPoolData = usePreviousNonNull(poolDataRaw);
	const poolData = useMemo(() => {
		if (poolDataRaw === undefined) {
			return previousPoolData;
		}

		return poolDataRaw;
	}, [poolDataRaw, previousPoolData])

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
	const poolMap = match.attributes?.match_pool?.data?.attributes?.maps?.find((mapd) => mapd?.map_id === map.id)

	const playerArray = Object.values(state.tourney.ipcClients).filter((ipcClient) => Boolean((ipcClient as any).spectating.name));
	const sortedPlayerArray = Object.values(state.tourney.ipcClients)
		// @ts-ignore
		.sort((playerA, playerB) => (playerA.gameplay.score > playerB.gameplay.score ? -1 : 1));

	const scoreGaps = {} as any;
	sortedPlayerArray.forEach((player, index) => {
		const currentScore = (player as any).gameplay.score;
		const gap = index === 0 ? 0 : currentScore - (sortedPlayerArray.at(0) as any).gameplay.score;

		scoreGaps[(player as any).spectating.userID] = [gap, index];
	});

	const colors = [
		"#0066ff",
		"#ff0000",
		"#ffd600",
		"#05ff00"
	]

	const ColorMassive = {} as any;
	playerArray.forEach((player, index) => {
		ColorMassive[(player as any).spectating.userID] = colors[index];
	});

	const renderedPlayers = playerArray.map((player, index) => {
		const currentScore = (player as any).gameplay.score;
		const gap = scoreGaps[(player as any).spectating.userID][0];
		return (
			<div
				id="SlotP1"
				className="setOrder1"
				style={{
					transform: `translateY(${scoreGaps[(player as any).spectating.userID][1] * 60}px)`
				}}
				key={index}
			>
				<div id="wrap" style={{ backgroundImage: `url('https://a.ppy.sh/${(player as any).spectating.userID}')` }} />
				<div
					id="avatarOne"
					className="inline"
					style={{ backgroundImage: `url('https://a.ppy.sh/${(player as any).spectating.userID}')` }}
				/>
				<div id="SlotColor" className="inline" style={{background: ColorMassive[(player as any).spectating.userID]}} />
				<div id="playerNameOne" className="inline">
					{(player as any).spectating.name}
				</div>
				<div id="gapOne" className="inline" style={{
					visibility: gap === 0 ? "hidden" : "visible"
				}}>
					gap
				</div>
				<div id="ScoreBetweenOne" className="inline ScoreBetween" style={{
					visibility: gap === 0 ? "hidden" : "visible"
				}}>
					<CountUp duration={1} value={gap as number}/>
				</div>
				<div id="ScoreText" className="inline">
					score
				</div>
				<div id="playScoreOne" className="inline">
					<CountUp duration={.5} value={currentScore as number}/>
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
			<div id="main">
				<div id="mapContainer" style={backgroundStyle}>
					<div id="overlay">
						<div id="mapCurrent">
							{
								poolMap ? <>
									<div id="MapSection">{poolMap?.mode_combination.slice(0, 2)}</div>
									<div id="mapPicked">{poolMap?.mode_combination.slice(2, 3)}</div>
								</> :
								<>
									<div id='MapSection'/>
									<div id='mapPicked'/>
								</>
							}
						</div>
						<div id="mapTitle">{mapTitle}</div>
						<div id="mapArtist">{mapArtist}</div>
						<div id="diffText">Difficulty</div>
						<div id="mapDifficulty">{mapDifficulty}</div>
						<div id="mapStats">
							<div id="csText">CS</div>
							<div id="mapCS">{mapCS}</div>
							<div id="arText">AR</div>
							<div id="mapAR">{mapAR}</div>
							<div id="odText">OD</div>
							<div id="mapOD">{mapOD}</div>
							<div id="bpmText">BPM</div>
							<div id="mapBPM">{mapBPM}</div>
							<div id="srText">SR</div>
							<div id="mapSR">{mapSR}</div>
						</div>
						<div id="mapperBlock">
							<div id="mapperName">{mapMapper}</div>
							<div id="mapperText">Mapper</div>
						</div>
						<div id="mapIDblock">
							<div id="mapID">{mapID}</div>
							<div id="mapIDtext">Beatmap ID</div>
						</div>
					</div>
				</div>
				<div id="scoreWall" />
				<div id="xp-logo" />
				<div id="bottom">
					{ renderedPlayers }
				</div>
			</div>
		</Screen>
	);
};
