import { useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query';

import { Header } from '@/components/Header';
import { Screen } from '@/components/Screen';
import { graphqlClient } from '@/graphql/client';
import { CurrentMatchQuery, getSdk } from '@/graphql/queries/CurrentMatch/CurrentMatch.sdk';
import { usePreviousNonNull } from '@/utils/usePreviousNonNull';

const OnlyMapPool: React.FC = () => {
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

	const stage = currentMatch.matches.data[0].attributes?.stage;

	return (
		<Screen>
			<Header customTextStart={stage} />
		</Screen>
	);
};
