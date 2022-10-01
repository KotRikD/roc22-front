import React, { useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query';

import { Header } from '@/components/Header';
import { MapInfo } from '@/components/MapInfo';
import { Screen } from '@/components/Screen';
import XpLogo from '@/components/XpLogo';
import { graphqlClient } from '@/graphql/client';
import { CurrentMatchQuery, getSdk } from '@/graphql/queries/CurrentMatch/CurrentMatch.sdk';
import VersusPlayer from '@/pages/screens/versusPlay/VersusPlayer';
import { Direction } from '@/utils/Direction';
import { usePreviousNonNull } from '@/utils/usePreviousNonNull';

import './index.scss';

export const VersusPlay = () => {
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

		// Здесь я очищаю компонент от слушателя data, аналог в обычном js - clearTimeout(callback)
		return () => {
			console.log("[Current Play] Callback 'data' removed");
			window.GOSU.removeListener('data', callback);
		};
	}, []);

	if (state === null || !poolData || !currentMatch?.matches || currentMatch.matches.data.length < 1) return null;

	if (error) return <>Не удалось загрузить пул!</>;

	const match = currentMatch.matches.data.at(0)!;
	const stage = match.attributes?.stage!;
	const bestOf = state.tourney.manager.bestOF;

	const playerArray = Object.values(state.tourney.ipcClients).filter((ipcClient) => Boolean((ipcClient as any).spectating.name));
	const player0 = playerArray.length > 0 ? (playerArray[0] as any) : undefined;
	const player1 = playerArray.length > 1 ? (playerArray[1] as any) : undefined;

	const dumbPlayerProps = {
		nickname: '???',
		avatarUrl: 'https://a.ppy.sh/-1',
		leader: false,
		bestOf: bestOf,
		currentScore: 0,
		currentMatchScore: 0
	};

	const isLeaderFirst = player0 && player1 ? player0.gameplay.score > player1.gameplay.score : true;

	return (
		<Screen
			style={{
				display: 'flex',
				flexDirection: 'column'
			}}
		>
			<Header customTextStart={stage} />
			<div className="transparent-screen"></div>
			<div className="versus-footer">
				{player0 ? (
					<VersusPlayer
						direction={Direction.Left}
						nickname={player0.spectating.name}
						avatarUrl={`https://a.ppy.sh/${player0.spectating.userID}`}
						leader={isLeaderFirst}
						bestOf={bestOf}
						currentScore={player0.gameplay.score}
						currentMatchScore={state.tourney.manager.stars.left}
					/>
				) : (
					<VersusPlayer direction={Direction.Left} {...dumbPlayerProps} />
				)}

				<div className="versus-center">
					<MapInfo style={{ marginBottom: '20px' }} />
					<XpLogo width={'100%'} height={'85px'} />
				</div>
				{player1 ? (
					<VersusPlayer
						direction={Direction.Right}
						nickname={player1.spectating.name}
						avatarUrl={`https://a.ppy.sh/${player1.spectating.userID}`}
						leader={!isLeaderFirst}
						bestOf={bestOf}
						currentScore={player1.gameplay.score}
						currentMatchScore={state.tourney.manager.stars.right}
					/>
				) : (
					<VersusPlayer direction={Direction.Right} {...dumbPlayerProps} />
				)}
			</div>
		</Screen>
	);
};
