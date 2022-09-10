import React, { useEffect, useState } from 'react';

import { Header } from '@/components/Header';
import { Screen } from '@/components/Screen';
import { formatNumber } from '@/utils/formatNumber';

import { getQueryVariable } from '../../../utils/getQueryVariable';
import './index.css';

// interface AppState {
//     scoreVisibleTemp?: boolean;
// }
export function getBPM(bpmStruct: any): string {
	if (bpmStruct.min === bpmStruct.max) return bpmStruct.max;

	return `${bpmStruct.min}~${bpmStruct.max}`;
}

export const CurrentPlay: React.FC = () => {
	const [state, setState] = useState<any>(null);
	// const [appState, setAppState] = useState<AppState>({});

	/*  
        Короче, давай попробую объяснить что такое useEffect и почему он здесь нужен
        В реакте useEffect, нужен для того, чтобы выполнять любой side effect,
        в обычном js очень сильно можно сравнить с setTimeout, но так как реакт реактивен,
        а значит может обновлять своё состояние 500 миллионов раз в секунду, 
        setTimeout нам не подходит.

        Соответственно, useEffect здесь будет вызван один раз, при первом вызове компонента
    */
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

	if (state === null) return null;

	const backendVariable = getQueryVariable('backend');
	const hostBackend = new URL(backendVariable || '').host;

	const { scoreVisible } = state.tourney.manager.bools;

	// if(appState.scoreVisibleTemp !== state.tourney.manager.bools.scoreVisible) {
	//     setAppState({
	//         ...appState,
	//         scoreVisibleTemp: state.tourney.manager.bools.scoreVisible
	//     })
	// }

	// const chatStyle = {
	//     opacity: appState.scoreVisibleTemp ? 0 : 1,
	// }
	// const playerScoreOneStyle = {
	//     opacity: appState.scoreVisibleTemp ? 1 : 0
	// }
	// const playerScoreTwoStyle = {
	//     opacity: appState.scoreVisibleTemp ? 1 : 0
	// }
	// const playerScoreThreeStyle = {
	//     opacity: appState.scoreVisibleTemp ? 1 : 0
	// }
	// const playerScoreFourStyle = {
	//     opacity: appState.scoreVisibleTemp ? 1 : 0
	// }

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
					{formatNumber(gap as number)}
				</div>
			

				<div id="ScoreText" className="inline">
					score
				</div>
				<div id="playScoreOne" className="inline">
					{formatNumber(currentScore as number)}
				</div>
			</div>
		);
	});

	/*
        Теперь всё состояние у нас доступно в переменной state, с которой мы вольны творить что угодно
    */
	return (
		<Screen>
			{/* {JSON.stringify(state)} */}
			<Header customTextStart={'Round of 16'} />
			<div id="main">
				<div id="mapContainer" style={backgroundStyle}>
					<div id="overlay">
						<div id="mapCurrent">
							<div id="MapSection"></div>
							<div id="mapPicked"></div>
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
					{/* <chat><players> | <chat><--players--> | <---chat--->{не будет задержки}<players>    */}
					{!scoreVisible ? <div id="chats"></div> : null}
					{scoreVisible ? (
						<>
							{renderedPlayers}
							{/*<div id="SlotP2" className={Or2}>*/}
							{/*    <div id="wrap" style={{ backgroundImage: playerDataTwo[1] }}></div>*/}
							{/*	<div id="avatarTwo" className="inline" style={{ backgroundImage: playerDataTwo[1] }}></div>*/}
							{/*	<div id="Slot2Color" className="inline"></div>*/}
							{/*    <div id="playerNameTwo" className="inline">*/}
							{/*		{playerDataTwo[0]}*/}
							{/*	</div>*/}
							{/*    <div id="gapTwo" className="inline">{SG2}</div>*/}
							{/*	<div id="ScoreBetweenTwo" className="inline ScoreBetween">*/}
							{/*       {formatNumber(Sb2 as number)}*/}
							{/*	</div>*/}
							{/*    <div id="ScoreText" className="inline">score</div>*/}
							{/*    <div id="playScoreTwo" className="inline">*/}
							{/*		{formatNumber(playerDataTwo[2] as number)}*/}
							{/*	</div>								*/}
							{/*</div>*/}
							{/*<div id="SlotP3" className={Or3}>*/}
							{/*    <div id="wrap" style={{ backgroundImage: playerDataThree[1] }}></div>*/}
							{/*	<div id="avatarThree" className="inline" style={{ backgroundImage: playerDataThree[1] }}></div>*/}
							{/*	<div id="Slot3Color" className="inline"></div>*/}
							{/*    <div id="playerNameThree" className="inline">*/}
							{/*		{playerDataThree[0]}*/}
							{/*	</div>*/}
							{/*    <div id="gapThree" className="inline">{SG3}</div>*/}
							{/*    <div id="ScoreBetweenThree" className="inline ScoreBetween">*/}
							{/*        {formatNumber(Sb3 as number)}*/}
							{/*	</div>*/}
							{/*    <div id="ScoreText" className="inline">score</div>*/}
							{/*	<div id="playScoreThree" className="inline">*/}
							{/*		{formatNumber(playerDataThree[2] as number)}*/}
							{/*	</div>								*/}
							{/*</div>*/}
							{/*<div id="SlotP4" className={Or4}>*/}
							{/*    <div id="wrap" style={{ backgroundImage: playerDataFour[1] }}></div>*/}
							{/*	<div id="avatarFour" className="inline" style={{ backgroundImage: playerDataFour[1] }}></div>*/}
							{/*	<div id="Slot4Color" className="inline"></div>*/}
							{/*    <div id="playerNameFour" className="inline">*/}
							{/*		{playerDataFour[0]}*/}
							{/*	</div>*/}
							{/*    <div id="gapFour" className="inline">{SG4}</div>*/}
							{/*	<div id="ScoreBetweenFour" className="inline ScoreBetween">*/}
							{/*        {formatNumber(Sb4 as number)}*/}
							{/*	</div>*/}
							{/*    <div id="ScoreText" className="inline">score</div>*/}
							{/*    <div id="playScoreFour" className="inline">*/}
							{/*		{formatNumber(playerDataFour[2] as number)}*/}
							{/*	</div>								*/}
							{/*</div>*/}
						</>
					) : null}
				</div>
			</div>
		</Screen>
	);
};
