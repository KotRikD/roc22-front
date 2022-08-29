import { useQuery } from "react-query";
import { graphqlClient } from "../../.."
import { getSdk } from "../../../graphql/queries/MatchQuery.sdk"

export const TestGQLMatches: React.FC = () => {
    const sdk = getSdk(graphqlClient);
    const { isLoading, error, data } = useQuery("list-all-matches", () => sdk.MatchQuery())
    
    if (isLoading) return <p>Грузимся!</p>
    if (error) return <p>Упали с ошибкой</p>

    return (
        // @ts-ignore
        <div style={{
            'whiteSpace': 'pre'
        }}>
            {JSON.stringify(data, null, 4)}
        </div>
    )
}