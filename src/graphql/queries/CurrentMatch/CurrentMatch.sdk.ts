/* DO NOT EDIT -- This is auto-generated file */
/* eslint-disable */
// @ts-nocheck
// prettier-ignore
import type * as Types from '../../__generated__/types';

import type { GraphQLClient } from 'graphql-request';
import type * as Dom from 'graphql-request/dist/types.dom';
import type { DocumentNode } from 'graphql';
export type CurrentMatchQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type CurrentMatchQuery = { __typename?: 'Query', matches: { __typename?: 'MatchEntityResponseCollection', data: Array<{ __typename?: 'MatchEntity', id: string | null, attributes: { __typename?: 'Match', lobby_id: string, stage: string, matchType: Types.Enum_Match_Matchtype, date_start: any, proxy_pool_id: string, createdAt: any | null, updatedAt: any | null, match_pool: { __typename?: 'MatchPoolEntityResponse', data: { __typename?: 'MatchPoolEntity', attributes: { __typename?: 'MatchPool', name: string, maps: Array<{ __typename?: 'ComponentTestPickedMap', map_id: any, mode_combination: string } | null> | null } | null } | null } | null, players: Array<{ __typename?: 'ComponentStructuresPlayerFields', osu_name: string, osu_id: any, protected_map: any | null, protected_map_vs: string | null, roll: number, places: Array<{ __typename?: 'ComponentNoizyStuffPlaces', place: number } | null> | null, bans: Array<{ __typename?: 'ComponentNoizyStuffPicks', map_id: any } | null> | null } | null> | null, picks: Array<{ __typename?: 'ComponentNoizyStuffPicks', map_id: any } | null> | null } | null }> } | null };


export const CurrentMatchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CurrentMatch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"matches"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"is_active_match"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"BooleanValue","value":true}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lobby_id"}},{"kind":"Field","name":{"kind":"Name","value":"stage"}},{"kind":"Field","name":{"kind":"Name","value":"matchType"}},{"kind":"Field","name":{"kind":"Name","value":"date_start"}},{"kind":"Field","name":{"kind":"Name","value":"proxy_pool_id"}},{"kind":"Field","name":{"kind":"Name","value":"match_pool"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"maps"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"map_id"}},{"kind":"Field","name":{"kind":"Name","value":"mode_combination"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"players"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"osu_name"}},{"kind":"Field","name":{"kind":"Name","value":"osu_id"}},{"kind":"Field","name":{"kind":"Name","value":"protected_map"}},{"kind":"Field","name":{"kind":"Name","value":"protected_map_vs"}},{"kind":"Field","name":{"kind":"Name","value":"roll"}},{"kind":"Field","name":{"kind":"Name","value":"places"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"place"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bans"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"map_id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"picks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"map_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]}}]} as unknown as DocumentNode;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    CurrentMatch(variables?: CurrentMatchQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CurrentMatchQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CurrentMatchQuery>(CurrentMatchDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CurrentMatch', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;