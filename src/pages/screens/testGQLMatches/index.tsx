import { graphqlClient } from '@graphql-int/client';
import { getSdk } from '@graphql-int/queries/MatchQuery.sdk';
import { useQuery } from 'react-query';

export const TestGQLMatches: React.FC = () => {
	const sdk = getSdk(graphqlClient);
	const { isLoading, error, data } = useQuery('list-all-matches', () => sdk.MatchQuery());

	if (isLoading) return <p>Грузимся!</p>;
	if (error) return <p>Упали с ошибкой</p>;

	return (
		// @ts-ignore
		<div
			style={{
				whiteSpace: 'pre'
			}}
		>
			{JSON.stringify(data, null, 4)}
		</div>
	);
};
