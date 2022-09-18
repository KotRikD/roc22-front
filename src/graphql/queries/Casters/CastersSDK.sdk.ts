/* DO NOT EDIT -- This is auto-generated file */
/* eslint-disable */
// @ts-nocheck
// prettier-ignore
import type * as Types from '../../__generated__/types';

import type { GraphQLClient } from 'graphql-request';
import type * as Dom from 'graphql-request/dist/types.dom';
import type { DocumentNode } from 'graphql';
export type GoToCasterMutationVariables = Types.Exact<{
  matchID: Types.Scalars['ID'];
  newStaff: Types.InputMaybe<Array<Types.InputMaybe<Types.Scalars['ID']>> | Types.InputMaybe<Types.Scalars['ID']>>;
}>;


export type GoToCasterMutation = { __typename?: 'Mutation', updateMatch: { __typename?: 'MatchEntityResponse', data: { __typename?: 'MatchEntity', attributes: { __typename?: 'Match', staff: { __typename?: 'UsersPermissionsUserRelationResponseCollection', data: Array<{ __typename?: 'UsersPermissionsUserEntity', attributes: { __typename?: 'UsersPermissionsUser', osu_id: any | null, username: string } | null }> } | null } | null } | null } | null };


export const GoToCasterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"GoToCaster"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"matchID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newStaff"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateMatch"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"matchID"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"staff"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newStaff"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"staff"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"osu_id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    GoToCaster(variables: GoToCasterMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GoToCasterMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<GoToCasterMutation>(GoToCasterDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GoToCaster', 'mutation');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;