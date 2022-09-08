import { graphqlClient } from '@graphql-int/client';
import { MatchQueryQuery, getSdk } from '@graphql-int/queries/MatchQuery.sdk';
import { useEffect, useState } from 'react';

export const TestGQLMatchesPoller: React.FC = () => {
	const [state, setState] = useState<MatchQueryQuery | null>(null);
	const sdk = getSdk(graphqlClient);

	useEffect(() => {
		const pollTask = () => sdk.MatchQuery().then((data) => data && setState(data));
		setInterval(pollTask, 1000);

		// @ts-ignore
		return () => clearInterval(pollTask);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		// @ts-ignore
		<div
			style={{
				whiteSpace: 'pre'
			}}
		>
			{state && JSON.stringify(state, null, 4)}
		</div>
	);
};
