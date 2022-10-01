import React, { FC, useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query';

import { graphqlClient } from '@/graphql/client';
import { CurrentMatchQuery, getSdk } from '@/graphql/queries/CurrentMatch/CurrentMatch.sdk';
import { getBPM } from '@/pages/screens/currentPlay';
import { getQueryVariable } from '@/utils/getQueryVariable';
import { usePreviousNonNull } from '@/utils/usePreviousNonNull';

import styles from './index.module.scss';

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
	width?: string;
	height?: string;
}

export const MapInfo: FC<IProps> = (props) => {
	const style: any = {};

	if (props.width) {
		style.width = props.width;
	}

	if (props.height) {
		style.height = props.height;
	}

	const [state, setState] = useState<any>(null);
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

		return () => {
			console.log("[Current Play] Callback 'data' removed");
			window.GOSU.removeListener('data', callback);
		};
	}, []);

	if (state === null || !poolData || !currentMatch?.matches || currentMatch.matches.data.length < 1) return null;

	if (error) return <>Не удалось загрузить пул!</>;

	const match = currentMatch.matches.data.at(0)!;

	const backendVariable = getQueryVariable('backend');
	const hostBackend = new URL(backendVariable || '').host;

	const pathToImage = state.menu.bm.path.full.replace(/#/g, '%23').replace(/%/g, '%25').replace(/\\/g, '/');

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
	console.log(match, 'match');
	const modeCombination = poolMap?.mode_combination.slice(0, 2) || 'NOT_DEFINED_MODS';

	return (
		<div
			{...props}
			className={styles.mapInfo}
			style={{
				backgroundImage: `url('http://${hostBackend}/Songs/${pathToImage}')`,
				backgroundSize: 'cover',
				backgroundPosition: 'center center',
				...props.style,
				...style
			}}
		>
			<div className={styles.mapInfoMod}>
				{/*<>*/}
				{/*	<div className={`${modeCombination} ${styles.mapInfoModText}`}>*/}
				{/*		DT*/}
				{/*	</div>*/}
				{/*	<div className={`${modeCombination} ${styles.mapInfoModNumber}`}>*/}
				{/*		1*/}
				{/*	</div>*/}
				{/*</>*/}
				{poolMap ? (
					<>
						<div className={`${modeCombination} ${styles.mapInfoModText}`}>{poolMap?.mode_combination.slice(0, 2)}</div>
						<div className={`${modeCombination} ${styles.mapInfoModNumber}`}>{poolMap?.mode_combination.slice(2, 3)}</div>
					</>
				) : (
					<></>
				)}
			</div>

			<div className={styles.mapInfoItem}>
				<span className={styles.mapInfoTitle}>{mapTitle}</span>
				<span className={styles.mapInfoArtist}>{mapArtist}</span>
			</div>

			<div className={styles.mapInfoFooter}>
				<div className={styles.mapInfoItemRow}>
					<div className={styles.stat}>
						<span className={`${modeCombination} ${styles.statTitle}`}>Difficulty</span>
						<span className={styles.statText}>{mapDifficulty}</span>
					</div>
					<div className={styles.stat}>
						<span className={`${modeCombination} ${styles.statTitle}`}>Mapper</span>
						<span className={styles.statText}>{mapMapper}</span>
					</div>
				</div>
				<div className={styles.mapInfoItemRow}>
					<div className={styles.mapStats}>
						<div className={styles.stat}>
							<span className={`${modeCombination} ${styles.statTitle}`}>CS</span>
							<span className={styles.statText}>{mapCS}</span>
						</div>
						<div className={styles.stat}>
							<span className={`${modeCombination} ${styles.statTitle}`}>AR</span>
							<span className={styles.statText}>{mapAR}</span>
						</div>
						<div className={styles.stat}>
							<span className={`${modeCombination} ${styles.statTitle}`}>OD</span>
							<span className={styles.statText}>{mapOD}</span>
						</div>
						<div className={styles.stat}>
							<span className={`${modeCombination} ${styles.statTitle}`}>BPM</span>
							<span className={styles.statText}>{mapBPM}</span>
						</div>
						<div className={styles.stat}>
							<span className={`${modeCombination} ${styles.statTitle}`}>SR</span>
							<span className={styles.statText}>{mapSR}</span>
						</div>
					</div>
					<div className={styles.stat}>
						<span className={`${modeCombination} ${styles.statTitle}`}>Beatmap ID</span>
						<span className={styles.statText}>{mapID}</span>
					</div>
				</div>
			</div>
		</div>
	);
};
