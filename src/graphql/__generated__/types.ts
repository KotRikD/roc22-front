/* DO NOT EDIT -- This is auto-generated file */
/* eslint-disable */
// @ts-nocheck
// prettier-ignore
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  JSON: any;
  Long: any;
  Upload: any;
};

export type BooleanFilterInput = {
  and: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  between: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  contains: InputMaybe<Scalars['Boolean']>;
  containsi: InputMaybe<Scalars['Boolean']>;
  endsWith: InputMaybe<Scalars['Boolean']>;
  eq: InputMaybe<Scalars['Boolean']>;
  eqi: InputMaybe<Scalars['Boolean']>;
  gt: InputMaybe<Scalars['Boolean']>;
  gte: InputMaybe<Scalars['Boolean']>;
  in: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  lt: InputMaybe<Scalars['Boolean']>;
  lte: InputMaybe<Scalars['Boolean']>;
  ne: InputMaybe<Scalars['Boolean']>;
  not: InputMaybe<BooleanFilterInput>;
  notContains: InputMaybe<Scalars['Boolean']>;
  notContainsi: InputMaybe<Scalars['Boolean']>;
  notIn: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  notNull: InputMaybe<Scalars['Boolean']>;
  null: InputMaybe<Scalars['Boolean']>;
  or: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  startsWith: InputMaybe<Scalars['Boolean']>;
};

export type ComponentNoizyStuffPicks = {
  __typename?: 'ComponentNoizyStuffPicks';
  id: Scalars['ID'];
  map_id: Maybe<Scalars['Long']>;
};

export type ComponentNoizyStuffPicksFiltersInput = {
  and: InputMaybe<Array<InputMaybe<ComponentNoizyStuffPicksFiltersInput>>>;
  map_id: InputMaybe<LongFilterInput>;
  not: InputMaybe<ComponentNoizyStuffPicksFiltersInput>;
  or: InputMaybe<Array<InputMaybe<ComponentNoizyStuffPicksFiltersInput>>>;
};

export type ComponentNoizyStuffPicksInput = {
  id: InputMaybe<Scalars['ID']>;
  map_id: InputMaybe<Scalars['Long']>;
};

export type ComponentNoizyStuffPlaces = {
  __typename?: 'ComponentNoizyStuffPlaces';
  id: Scalars['ID'];
  place: Maybe<Scalars['Int']>;
};

export type ComponentNoizyStuffPlacesFiltersInput = {
  and: InputMaybe<Array<InputMaybe<ComponentNoizyStuffPlacesFiltersInput>>>;
  not: InputMaybe<ComponentNoizyStuffPlacesFiltersInput>;
  or: InputMaybe<Array<InputMaybe<ComponentNoizyStuffPlacesFiltersInput>>>;
  place: InputMaybe<IntFilterInput>;
};

export type ComponentNoizyStuffPlacesInput = {
  id: InputMaybe<Scalars['ID']>;
  place: InputMaybe<Scalars['Int']>;
};

export type ComponentStructuresPlayerFields = {
  __typename?: 'ComponentStructuresPlayerFields';
  bans: Maybe<Array<Maybe<ComponentNoizyStuffPicks>>>;
  id: Scalars['ID'];
  osu_id: Maybe<Scalars['Long']>;
  osu_name: Maybe<Scalars['String']>;
  places: Maybe<Array<Maybe<ComponentNoizyStuffPlaces>>>;
  protected_map: Maybe<Scalars['Long']>;
};


export type ComponentStructuresPlayerFieldsBansArgs = {
  filters: InputMaybe<ComponentNoizyStuffPicksFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type ComponentStructuresPlayerFieldsPlacesArgs = {
  filters: InputMaybe<ComponentNoizyStuffPlacesFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentStructuresPlayerFieldsFiltersInput = {
  and: InputMaybe<Array<InputMaybe<ComponentStructuresPlayerFieldsFiltersInput>>>;
  bans: InputMaybe<ComponentNoizyStuffPicksFiltersInput>;
  not: InputMaybe<ComponentStructuresPlayerFieldsFiltersInput>;
  or: InputMaybe<Array<InputMaybe<ComponentStructuresPlayerFieldsFiltersInput>>>;
  osu_id: InputMaybe<LongFilterInput>;
  osu_name: InputMaybe<StringFilterInput>;
  places: InputMaybe<ComponentNoizyStuffPlacesFiltersInput>;
  protected_map: InputMaybe<LongFilterInput>;
};

export type ComponentStructuresPlayerFieldsInput = {
  bans: InputMaybe<Array<InputMaybe<ComponentNoizyStuffPicksInput>>>;
  id: InputMaybe<Scalars['ID']>;
  osu_id: InputMaybe<Scalars['Long']>;
  osu_name: InputMaybe<Scalars['String']>;
  places: InputMaybe<Array<InputMaybe<ComponentNoizyStuffPlacesInput>>>;
  protected_map: InputMaybe<Scalars['Long']>;
};

export type ComponentTestPickedMap = {
  __typename?: 'ComponentTestPickedMap';
  id: Scalars['ID'];
  map_id: Maybe<Scalars['Long']>;
  mode_combination: Maybe<Scalars['String']>;
};

export type ComponentTestPickedMapFiltersInput = {
  and: InputMaybe<Array<InputMaybe<ComponentTestPickedMapFiltersInput>>>;
  map_id: InputMaybe<LongFilterInput>;
  mode_combination: InputMaybe<StringFilterInput>;
  not: InputMaybe<ComponentTestPickedMapFiltersInput>;
  or: InputMaybe<Array<InputMaybe<ComponentTestPickedMapFiltersInput>>>;
};

export type ComponentTestPickedMapInput = {
  id: InputMaybe<Scalars['ID']>;
  map_id: InputMaybe<Scalars['Long']>;
  mode_combination: InputMaybe<Scalars['String']>;
};

export type DateTimeFilterInput = {
  and: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  between: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  contains: InputMaybe<Scalars['DateTime']>;
  containsi: InputMaybe<Scalars['DateTime']>;
  endsWith: InputMaybe<Scalars['DateTime']>;
  eq: InputMaybe<Scalars['DateTime']>;
  eqi: InputMaybe<Scalars['DateTime']>;
  gt: InputMaybe<Scalars['DateTime']>;
  gte: InputMaybe<Scalars['DateTime']>;
  in: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  lt: InputMaybe<Scalars['DateTime']>;
  lte: InputMaybe<Scalars['DateTime']>;
  ne: InputMaybe<Scalars['DateTime']>;
  not: InputMaybe<DateTimeFilterInput>;
  notContains: InputMaybe<Scalars['DateTime']>;
  notContainsi: InputMaybe<Scalars['DateTime']>;
  notIn: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  notNull: InputMaybe<Scalars['Boolean']>;
  null: InputMaybe<Scalars['Boolean']>;
  or: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  startsWith: InputMaybe<Scalars['DateTime']>;
};

export type Enum_Match_Matchstate =
  | 'CANCELED'
  | 'FINISHED'
  | 'IN_PROGRESS'
  | 'NOT_STARTED';

export type Enum_Match_Matchtype =
  | 'ROC'
  | 'VERSUS';

export type FileInfoInput = {
  alternativeText: InputMaybe<Scalars['String']>;
  caption: InputMaybe<Scalars['String']>;
  name: InputMaybe<Scalars['String']>;
};

export type FloatFilterInput = {
  and: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  between: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  contains: InputMaybe<Scalars['Float']>;
  containsi: InputMaybe<Scalars['Float']>;
  endsWith: InputMaybe<Scalars['Float']>;
  eq: InputMaybe<Scalars['Float']>;
  eqi: InputMaybe<Scalars['Float']>;
  gt: InputMaybe<Scalars['Float']>;
  gte: InputMaybe<Scalars['Float']>;
  in: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  lt: InputMaybe<Scalars['Float']>;
  lte: InputMaybe<Scalars['Float']>;
  ne: InputMaybe<Scalars['Float']>;
  not: InputMaybe<FloatFilterInput>;
  notContains: InputMaybe<Scalars['Float']>;
  notContainsi: InputMaybe<Scalars['Float']>;
  notIn: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  notNull: InputMaybe<Scalars['Boolean']>;
  null: InputMaybe<Scalars['Boolean']>;
  or: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  startsWith: InputMaybe<Scalars['Float']>;
};

export type GenericMorph = ComponentNoizyStuffPicks | ComponentNoizyStuffPlaces | ComponentStructuresPlayerFields | ComponentTestPickedMap | I18NLocale | Match | MatchPool | Tournament | UploadFile | UploadFolder | UsersPermissionsPermission | UsersPermissionsRole | UsersPermissionsUser;

export type I18NLocale = {
  __typename?: 'I18NLocale';
  code: Maybe<Scalars['String']>;
  createdAt: Maybe<Scalars['DateTime']>;
  name: Maybe<Scalars['String']>;
  updatedAt: Maybe<Scalars['DateTime']>;
};

export type I18NLocaleEntity = {
  __typename?: 'I18NLocaleEntity';
  attributes: Maybe<I18NLocale>;
  id: Maybe<Scalars['ID']>;
};

export type I18NLocaleEntityResponse = {
  __typename?: 'I18NLocaleEntityResponse';
  data: Maybe<I18NLocaleEntity>;
};

export type I18NLocaleEntityResponseCollection = {
  __typename?: 'I18NLocaleEntityResponseCollection';
  data: Array<I18NLocaleEntity>;
  meta: ResponseCollectionMeta;
};

export type I18NLocaleFiltersInput = {
  and: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>;
  code: InputMaybe<StringFilterInput>;
  createdAt: InputMaybe<DateTimeFilterInput>;
  id: InputMaybe<IdFilterInput>;
  name: InputMaybe<StringFilterInput>;
  not: InputMaybe<I18NLocaleFiltersInput>;
  or: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>;
  updatedAt: InputMaybe<DateTimeFilterInput>;
};

export type IdFilterInput = {
  and: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  between: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  contains: InputMaybe<Scalars['ID']>;
  containsi: InputMaybe<Scalars['ID']>;
  endsWith: InputMaybe<Scalars['ID']>;
  eq: InputMaybe<Scalars['ID']>;
  eqi: InputMaybe<Scalars['ID']>;
  gt: InputMaybe<Scalars['ID']>;
  gte: InputMaybe<Scalars['ID']>;
  in: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  lt: InputMaybe<Scalars['ID']>;
  lte: InputMaybe<Scalars['ID']>;
  ne: InputMaybe<Scalars['ID']>;
  not: InputMaybe<IdFilterInput>;
  notContains: InputMaybe<Scalars['ID']>;
  notContainsi: InputMaybe<Scalars['ID']>;
  notIn: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  notNull: InputMaybe<Scalars['Boolean']>;
  null: InputMaybe<Scalars['Boolean']>;
  or: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  startsWith: InputMaybe<Scalars['ID']>;
};

export type IntFilterInput = {
  and: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  between: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  contains: InputMaybe<Scalars['Int']>;
  containsi: InputMaybe<Scalars['Int']>;
  endsWith: InputMaybe<Scalars['Int']>;
  eq: InputMaybe<Scalars['Int']>;
  eqi: InputMaybe<Scalars['Int']>;
  gt: InputMaybe<Scalars['Int']>;
  gte: InputMaybe<Scalars['Int']>;
  in: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  lt: InputMaybe<Scalars['Int']>;
  lte: InputMaybe<Scalars['Int']>;
  ne: InputMaybe<Scalars['Int']>;
  not: InputMaybe<IntFilterInput>;
  notContains: InputMaybe<Scalars['Int']>;
  notContainsi: InputMaybe<Scalars['Int']>;
  notIn: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  notNull: InputMaybe<Scalars['Boolean']>;
  null: InputMaybe<Scalars['Boolean']>;
  or: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  startsWith: InputMaybe<Scalars['Int']>;
};

export type JsonFilterInput = {
  and: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  between: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  contains: InputMaybe<Scalars['JSON']>;
  containsi: InputMaybe<Scalars['JSON']>;
  endsWith: InputMaybe<Scalars['JSON']>;
  eq: InputMaybe<Scalars['JSON']>;
  eqi: InputMaybe<Scalars['JSON']>;
  gt: InputMaybe<Scalars['JSON']>;
  gte: InputMaybe<Scalars['JSON']>;
  in: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  lt: InputMaybe<Scalars['JSON']>;
  lte: InputMaybe<Scalars['JSON']>;
  ne: InputMaybe<Scalars['JSON']>;
  not: InputMaybe<JsonFilterInput>;
  notContains: InputMaybe<Scalars['JSON']>;
  notContainsi: InputMaybe<Scalars['JSON']>;
  notIn: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  notNull: InputMaybe<Scalars['Boolean']>;
  null: InputMaybe<Scalars['Boolean']>;
  or: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  startsWith: InputMaybe<Scalars['JSON']>;
};

export type LongFilterInput = {
  and: InputMaybe<Array<InputMaybe<Scalars['Long']>>>;
  between: InputMaybe<Array<InputMaybe<Scalars['Long']>>>;
  contains: InputMaybe<Scalars['Long']>;
  containsi: InputMaybe<Scalars['Long']>;
  endsWith: InputMaybe<Scalars['Long']>;
  eq: InputMaybe<Scalars['Long']>;
  eqi: InputMaybe<Scalars['Long']>;
  gt: InputMaybe<Scalars['Long']>;
  gte: InputMaybe<Scalars['Long']>;
  in: InputMaybe<Array<InputMaybe<Scalars['Long']>>>;
  lt: InputMaybe<Scalars['Long']>;
  lte: InputMaybe<Scalars['Long']>;
  ne: InputMaybe<Scalars['Long']>;
  not: InputMaybe<LongFilterInput>;
  notContains: InputMaybe<Scalars['Long']>;
  notContainsi: InputMaybe<Scalars['Long']>;
  notIn: InputMaybe<Array<InputMaybe<Scalars['Long']>>>;
  notNull: InputMaybe<Scalars['Boolean']>;
  null: InputMaybe<Scalars['Boolean']>;
  or: InputMaybe<Array<InputMaybe<Scalars['Long']>>>;
  startsWith: InputMaybe<Scalars['Long']>;
};

export type Match = {
  __typename?: 'Match';
  createdAt: Maybe<Scalars['DateTime']>;
  date_start: Maybe<Scalars['DateTime']>;
  lobby_id: Maybe<Scalars['String']>;
  matchState: Maybe<Enum_Match_Matchstate>;
  matchType: Maybe<Enum_Match_Matchtype>;
  match_pool: Maybe<MatchPoolEntityResponse>;
  picks: Maybe<Array<Maybe<ComponentNoizyStuffPicks>>>;
  players: Maybe<Array<Maybe<ComponentStructuresPlayerFields>>>;
  stage: Maybe<Scalars['String']>;
  updatedAt: Maybe<Scalars['DateTime']>;
};


export type MatchPicksArgs = {
  filters: InputMaybe<ComponentNoizyStuffPicksFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type MatchPlayersArgs = {
  filters: InputMaybe<ComponentStructuresPlayerFieldsFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type MatchEntity = {
  __typename?: 'MatchEntity';
  attributes: Maybe<Match>;
  id: Maybe<Scalars['ID']>;
};

export type MatchEntityResponse = {
  __typename?: 'MatchEntityResponse';
  data: Maybe<MatchEntity>;
};

export type MatchEntityResponseCollection = {
  __typename?: 'MatchEntityResponseCollection';
  data: Array<MatchEntity>;
  meta: ResponseCollectionMeta;
};

export type MatchFiltersInput = {
  and: InputMaybe<Array<InputMaybe<MatchFiltersInput>>>;
  createdAt: InputMaybe<DateTimeFilterInput>;
  date_start: InputMaybe<DateTimeFilterInput>;
  id: InputMaybe<IdFilterInput>;
  lobby_id: InputMaybe<StringFilterInput>;
  matchState: InputMaybe<StringFilterInput>;
  matchType: InputMaybe<StringFilterInput>;
  match_pool: InputMaybe<MatchPoolFiltersInput>;
  not: InputMaybe<MatchFiltersInput>;
  or: InputMaybe<Array<InputMaybe<MatchFiltersInput>>>;
  picks: InputMaybe<ComponentNoizyStuffPicksFiltersInput>;
  players: InputMaybe<ComponentStructuresPlayerFieldsFiltersInput>;
  stage: InputMaybe<StringFilterInput>;
  updatedAt: InputMaybe<DateTimeFilterInput>;
};

export type MatchInput = {
  date_start: InputMaybe<Scalars['DateTime']>;
  lobby_id: InputMaybe<Scalars['String']>;
  matchState: InputMaybe<Enum_Match_Matchstate>;
  matchType: InputMaybe<Enum_Match_Matchtype>;
  match_pool: InputMaybe<Scalars['ID']>;
  picks: InputMaybe<Array<InputMaybe<ComponentNoizyStuffPicksInput>>>;
  players: InputMaybe<Array<InputMaybe<ComponentStructuresPlayerFieldsInput>>>;
  stage: InputMaybe<Scalars['String']>;
};

export type MatchPool = {
  __typename?: 'MatchPool';
  createdAt: Maybe<Scalars['DateTime']>;
  maps: Maybe<Array<Maybe<ComponentTestPickedMap>>>;
  name: Maybe<Scalars['String']>;
  updatedAt: Maybe<Scalars['DateTime']>;
};


export type MatchPoolMapsArgs = {
  filters: InputMaybe<ComponentTestPickedMapFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type MatchPoolEntity = {
  __typename?: 'MatchPoolEntity';
  attributes: Maybe<MatchPool>;
  id: Maybe<Scalars['ID']>;
};

export type MatchPoolEntityResponse = {
  __typename?: 'MatchPoolEntityResponse';
  data: Maybe<MatchPoolEntity>;
};

export type MatchPoolEntityResponseCollection = {
  __typename?: 'MatchPoolEntityResponseCollection';
  data: Array<MatchPoolEntity>;
  meta: ResponseCollectionMeta;
};

export type MatchPoolFiltersInput = {
  and: InputMaybe<Array<InputMaybe<MatchPoolFiltersInput>>>;
  createdAt: InputMaybe<DateTimeFilterInput>;
  id: InputMaybe<IdFilterInput>;
  maps: InputMaybe<ComponentTestPickedMapFiltersInput>;
  name: InputMaybe<StringFilterInput>;
  not: InputMaybe<MatchPoolFiltersInput>;
  or: InputMaybe<Array<InputMaybe<MatchPoolFiltersInput>>>;
  updatedAt: InputMaybe<DateTimeFilterInput>;
};

export type MatchPoolInput = {
  maps: InputMaybe<Array<InputMaybe<ComponentTestPickedMapInput>>>;
  name: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Change user password. Confirm with the current password. */
  changePassword: Maybe<UsersPermissionsLoginPayload>;
  createMatch: Maybe<MatchEntityResponse>;
  createMatchPool: Maybe<MatchPoolEntityResponse>;
  createTournament: Maybe<TournamentEntityResponse>;
  createUploadFile: Maybe<UploadFileEntityResponse>;
  createUploadFolder: Maybe<UploadFolderEntityResponse>;
  /** Create a new role */
  createUsersPermissionsRole: Maybe<UsersPermissionsCreateRolePayload>;
  /** Create a new user */
  createUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  deleteMatch: Maybe<MatchEntityResponse>;
  deleteMatchPool: Maybe<MatchPoolEntityResponse>;
  deleteTournament: Maybe<TournamentEntityResponse>;
  deleteUploadFile: Maybe<UploadFileEntityResponse>;
  deleteUploadFolder: Maybe<UploadFolderEntityResponse>;
  /** Delete an existing role */
  deleteUsersPermissionsRole: Maybe<UsersPermissionsDeleteRolePayload>;
  /** Delete an existing user */
  deleteUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  /** Confirm an email users email address */
  emailConfirmation: Maybe<UsersPermissionsLoginPayload>;
  /** Request a reset password token */
  forgotPassword: Maybe<UsersPermissionsPasswordPayload>;
  login: UsersPermissionsLoginPayload;
  multipleUpload: Array<Maybe<UploadFileEntityResponse>>;
  /** Register a user */
  register: UsersPermissionsLoginPayload;
  removeFile: Maybe<UploadFileEntityResponse>;
  /** Reset user password. Confirm with a code (resetToken from forgotPassword) */
  resetPassword: Maybe<UsersPermissionsLoginPayload>;
  updateFileInfo: UploadFileEntityResponse;
  updateMatch: Maybe<MatchEntityResponse>;
  updateMatchPool: Maybe<MatchPoolEntityResponse>;
  updateTournament: Maybe<TournamentEntityResponse>;
  updateUploadFile: Maybe<UploadFileEntityResponse>;
  updateUploadFolder: Maybe<UploadFolderEntityResponse>;
  /** Update an existing role */
  updateUsersPermissionsRole: Maybe<UsersPermissionsUpdateRolePayload>;
  /** Update an existing user */
  updateUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  upload: UploadFileEntityResponse;
};


export type MutationChangePasswordArgs = {
  currentPassword: Scalars['String'];
  password: Scalars['String'];
  passwordConfirmation: Scalars['String'];
};


export type MutationCreateMatchArgs = {
  data: MatchInput;
};


export type MutationCreateMatchPoolArgs = {
  data: MatchPoolInput;
};


export type MutationCreateTournamentArgs = {
  data: TournamentInput;
};


export type MutationCreateUploadFileArgs = {
  data: UploadFileInput;
};


export type MutationCreateUploadFolderArgs = {
  data: UploadFolderInput;
};


export type MutationCreateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput;
};


export type MutationCreateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput;
};


export type MutationDeleteMatchArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteMatchPoolArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteTournamentArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUploadFileArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUploadFolderArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUsersPermissionsRoleArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUsersPermissionsUserArgs = {
  id: Scalars['ID'];
};


export type MutationEmailConfirmationArgs = {
  confirmation: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  input: UsersPermissionsLoginInput;
};


export type MutationMultipleUploadArgs = {
  field: InputMaybe<Scalars['String']>;
  files: Array<InputMaybe<Scalars['Upload']>>;
  ref: InputMaybe<Scalars['String']>;
  refId: InputMaybe<Scalars['ID']>;
};


export type MutationRegisterArgs = {
  input: UsersPermissionsRegisterInput;
};


export type MutationRemoveFileArgs = {
  id: Scalars['ID'];
};


export type MutationResetPasswordArgs = {
  code: Scalars['String'];
  password: Scalars['String'];
  passwordConfirmation: Scalars['String'];
};


export type MutationUpdateFileInfoArgs = {
  id: Scalars['ID'];
  info: InputMaybe<FileInfoInput>;
};


export type MutationUpdateMatchArgs = {
  data: MatchInput;
  id: Scalars['ID'];
};


export type MutationUpdateMatchPoolArgs = {
  data: MatchPoolInput;
  id: Scalars['ID'];
};


export type MutationUpdateTournamentArgs = {
  data: TournamentInput;
  id: Scalars['ID'];
};


export type MutationUpdateUploadFileArgs = {
  data: UploadFileInput;
  id: Scalars['ID'];
};


export type MutationUpdateUploadFolderArgs = {
  data: UploadFolderInput;
  id: Scalars['ID'];
};


export type MutationUpdateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput;
  id: Scalars['ID'];
};


export type MutationUpdateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput;
  id: Scalars['ID'];
};


export type MutationUploadArgs = {
  field: InputMaybe<Scalars['String']>;
  file: Scalars['Upload'];
  info: InputMaybe<FileInfoInput>;
  ref: InputMaybe<Scalars['String']>;
  refId: InputMaybe<Scalars['ID']>;
};

export type Pagination = {
  __typename?: 'Pagination';
  page: Scalars['Int'];
  pageCount: Scalars['Int'];
  pageSize: Scalars['Int'];
  total: Scalars['Int'];
};

export type PaginationArg = {
  limit: InputMaybe<Scalars['Int']>;
  page: InputMaybe<Scalars['Int']>;
  pageSize: InputMaybe<Scalars['Int']>;
  start: InputMaybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  i18NLocale: Maybe<I18NLocaleEntityResponse>;
  i18NLocales: Maybe<I18NLocaleEntityResponseCollection>;
  match: Maybe<MatchEntityResponse>;
  matchPool: Maybe<MatchPoolEntityResponse>;
  matchPools: Maybe<MatchPoolEntityResponseCollection>;
  matches: Maybe<MatchEntityResponseCollection>;
  me: Maybe<UsersPermissionsMe>;
  tournament: Maybe<TournamentEntityResponse>;
  tournaments: Maybe<TournamentEntityResponseCollection>;
  uploadFile: Maybe<UploadFileEntityResponse>;
  uploadFiles: Maybe<UploadFileEntityResponseCollection>;
  uploadFolder: Maybe<UploadFolderEntityResponse>;
  uploadFolders: Maybe<UploadFolderEntityResponseCollection>;
  usersPermissionsRole: Maybe<UsersPermissionsRoleEntityResponse>;
  usersPermissionsRoles: Maybe<UsersPermissionsRoleEntityResponseCollection>;
  usersPermissionsUser: Maybe<UsersPermissionsUserEntityResponse>;
  usersPermissionsUsers: Maybe<UsersPermissionsUserEntityResponseCollection>;
};


export type QueryI18NLocaleArgs = {
  id: InputMaybe<Scalars['ID']>;
};


export type QueryI18NLocalesArgs = {
  filters: InputMaybe<I18NLocaleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryMatchArgs = {
  id: InputMaybe<Scalars['ID']>;
};


export type QueryMatchPoolArgs = {
  id: InputMaybe<Scalars['ID']>;
};


export type QueryMatchPoolsArgs = {
  filters: InputMaybe<MatchPoolFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryMatchesArgs = {
  filters: InputMaybe<MatchFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryTournamentArgs = {
  id: InputMaybe<Scalars['ID']>;
};


export type QueryTournamentsArgs = {
  filters: InputMaybe<TournamentFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryUploadFileArgs = {
  id: InputMaybe<Scalars['ID']>;
};


export type QueryUploadFilesArgs = {
  filters: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryUploadFolderArgs = {
  id: InputMaybe<Scalars['ID']>;
};


export type QueryUploadFoldersArgs = {
  filters: InputMaybe<UploadFolderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryUsersPermissionsRoleArgs = {
  id: InputMaybe<Scalars['ID']>;
};


export type QueryUsersPermissionsRolesArgs = {
  filters: InputMaybe<UsersPermissionsRoleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryUsersPermissionsUserArgs = {
  id: InputMaybe<Scalars['ID']>;
};


export type QueryUsersPermissionsUsersArgs = {
  filters: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ResponseCollectionMeta = {
  __typename?: 'ResponseCollectionMeta';
  pagination: Pagination;
};

export type StringFilterInput = {
  and: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  between: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  contains: InputMaybe<Scalars['String']>;
  containsi: InputMaybe<Scalars['String']>;
  endsWith: InputMaybe<Scalars['String']>;
  eq: InputMaybe<Scalars['String']>;
  eqi: InputMaybe<Scalars['String']>;
  gt: InputMaybe<Scalars['String']>;
  gte: InputMaybe<Scalars['String']>;
  in: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  lt: InputMaybe<Scalars['String']>;
  lte: InputMaybe<Scalars['String']>;
  ne: InputMaybe<Scalars['String']>;
  not: InputMaybe<StringFilterInput>;
  notContains: InputMaybe<Scalars['String']>;
  notContainsi: InputMaybe<Scalars['String']>;
  notIn: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  notNull: InputMaybe<Scalars['Boolean']>;
  null: InputMaybe<Scalars['Boolean']>;
  or: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  startsWith: InputMaybe<Scalars['String']>;
};

export type Tournament = {
  __typename?: 'Tournament';
  createdAt: Maybe<Scalars['DateTime']>;
  date_end: Maybe<Scalars['DateTime']>;
  date_start: Maybe<Scalars['DateTime']>;
  description: Maybe<Scalars['String']>;
  name: Maybe<Scalars['String']>;
  updatedAt: Maybe<Scalars['DateTime']>;
};

export type TournamentEntity = {
  __typename?: 'TournamentEntity';
  attributes: Maybe<Tournament>;
  id: Maybe<Scalars['ID']>;
};

export type TournamentEntityResponse = {
  __typename?: 'TournamentEntityResponse';
  data: Maybe<TournamentEntity>;
};

export type TournamentEntityResponseCollection = {
  __typename?: 'TournamentEntityResponseCollection';
  data: Array<TournamentEntity>;
  meta: ResponseCollectionMeta;
};

export type TournamentFiltersInput = {
  and: InputMaybe<Array<InputMaybe<TournamentFiltersInput>>>;
  createdAt: InputMaybe<DateTimeFilterInput>;
  date_end: InputMaybe<DateTimeFilterInput>;
  date_start: InputMaybe<DateTimeFilterInput>;
  description: InputMaybe<StringFilterInput>;
  id: InputMaybe<IdFilterInput>;
  name: InputMaybe<StringFilterInput>;
  not: InputMaybe<TournamentFiltersInput>;
  or: InputMaybe<Array<InputMaybe<TournamentFiltersInput>>>;
  updatedAt: InputMaybe<DateTimeFilterInput>;
};

export type TournamentInput = {
  date_end: InputMaybe<Scalars['DateTime']>;
  date_start: InputMaybe<Scalars['DateTime']>;
  description: InputMaybe<Scalars['String']>;
  name: InputMaybe<Scalars['String']>;
};

export type UploadFile = {
  __typename?: 'UploadFile';
  alternativeText: Maybe<Scalars['String']>;
  caption: Maybe<Scalars['String']>;
  createdAt: Maybe<Scalars['DateTime']>;
  ext: Maybe<Scalars['String']>;
  formats: Maybe<Scalars['JSON']>;
  hash: Scalars['String'];
  height: Maybe<Scalars['Int']>;
  mime: Scalars['String'];
  name: Scalars['String'];
  previewUrl: Maybe<Scalars['String']>;
  provider: Scalars['String'];
  provider_metadata: Maybe<Scalars['JSON']>;
  related: Maybe<Array<Maybe<GenericMorph>>>;
  size: Scalars['Float'];
  updatedAt: Maybe<Scalars['DateTime']>;
  url: Scalars['String'];
  width: Maybe<Scalars['Int']>;
};

export type UploadFileEntity = {
  __typename?: 'UploadFileEntity';
  attributes: Maybe<UploadFile>;
  id: Maybe<Scalars['ID']>;
};

export type UploadFileEntityResponse = {
  __typename?: 'UploadFileEntityResponse';
  data: Maybe<UploadFileEntity>;
};

export type UploadFileEntityResponseCollection = {
  __typename?: 'UploadFileEntityResponseCollection';
  data: Array<UploadFileEntity>;
  meta: ResponseCollectionMeta;
};

export type UploadFileFiltersInput = {
  alternativeText: InputMaybe<StringFilterInput>;
  and: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>;
  caption: InputMaybe<StringFilterInput>;
  createdAt: InputMaybe<DateTimeFilterInput>;
  ext: InputMaybe<StringFilterInput>;
  folder: InputMaybe<UploadFolderFiltersInput>;
  folderPath: InputMaybe<StringFilterInput>;
  formats: InputMaybe<JsonFilterInput>;
  hash: InputMaybe<StringFilterInput>;
  height: InputMaybe<IntFilterInput>;
  id: InputMaybe<IdFilterInput>;
  mime: InputMaybe<StringFilterInput>;
  name: InputMaybe<StringFilterInput>;
  not: InputMaybe<UploadFileFiltersInput>;
  or: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>;
  previewUrl: InputMaybe<StringFilterInput>;
  provider: InputMaybe<StringFilterInput>;
  provider_metadata: InputMaybe<JsonFilterInput>;
  size: InputMaybe<FloatFilterInput>;
  updatedAt: InputMaybe<DateTimeFilterInput>;
  url: InputMaybe<StringFilterInput>;
  width: InputMaybe<IntFilterInput>;
};

export type UploadFileInput = {
  alternativeText: InputMaybe<Scalars['String']>;
  caption: InputMaybe<Scalars['String']>;
  ext: InputMaybe<Scalars['String']>;
  folder: InputMaybe<Scalars['ID']>;
  folderPath: InputMaybe<Scalars['String']>;
  formats: InputMaybe<Scalars['JSON']>;
  hash: InputMaybe<Scalars['String']>;
  height: InputMaybe<Scalars['Int']>;
  mime: InputMaybe<Scalars['String']>;
  name: InputMaybe<Scalars['String']>;
  previewUrl: InputMaybe<Scalars['String']>;
  provider: InputMaybe<Scalars['String']>;
  provider_metadata: InputMaybe<Scalars['JSON']>;
  size: InputMaybe<Scalars['Float']>;
  url: InputMaybe<Scalars['String']>;
  width: InputMaybe<Scalars['Int']>;
};

export type UploadFileRelationResponseCollection = {
  __typename?: 'UploadFileRelationResponseCollection';
  data: Array<UploadFileEntity>;
};

export type UploadFolder = {
  __typename?: 'UploadFolder';
  children: Maybe<UploadFolderRelationResponseCollection>;
  createdAt: Maybe<Scalars['DateTime']>;
  files: Maybe<UploadFileRelationResponseCollection>;
  name: Scalars['String'];
  parent: Maybe<UploadFolderEntityResponse>;
  path: Scalars['String'];
  pathId: Scalars['Int'];
  updatedAt: Maybe<Scalars['DateTime']>;
};


export type UploadFolderChildrenArgs = {
  filters: InputMaybe<UploadFolderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type UploadFolderFilesArgs = {
  filters: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type UploadFolderEntity = {
  __typename?: 'UploadFolderEntity';
  attributes: Maybe<UploadFolder>;
  id: Maybe<Scalars['ID']>;
};

export type UploadFolderEntityResponse = {
  __typename?: 'UploadFolderEntityResponse';
  data: Maybe<UploadFolderEntity>;
};

export type UploadFolderEntityResponseCollection = {
  __typename?: 'UploadFolderEntityResponseCollection';
  data: Array<UploadFolderEntity>;
  meta: ResponseCollectionMeta;
};

export type UploadFolderFiltersInput = {
  and: InputMaybe<Array<InputMaybe<UploadFolderFiltersInput>>>;
  children: InputMaybe<UploadFolderFiltersInput>;
  createdAt: InputMaybe<DateTimeFilterInput>;
  files: InputMaybe<UploadFileFiltersInput>;
  id: InputMaybe<IdFilterInput>;
  name: InputMaybe<StringFilterInput>;
  not: InputMaybe<UploadFolderFiltersInput>;
  or: InputMaybe<Array<InputMaybe<UploadFolderFiltersInput>>>;
  parent: InputMaybe<UploadFolderFiltersInput>;
  path: InputMaybe<StringFilterInput>;
  pathId: InputMaybe<IntFilterInput>;
  updatedAt: InputMaybe<DateTimeFilterInput>;
};

export type UploadFolderInput = {
  children: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  files: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  name: InputMaybe<Scalars['String']>;
  parent: InputMaybe<Scalars['ID']>;
  path: InputMaybe<Scalars['String']>;
  pathId: InputMaybe<Scalars['Int']>;
};

export type UploadFolderRelationResponseCollection = {
  __typename?: 'UploadFolderRelationResponseCollection';
  data: Array<UploadFolderEntity>;
};

export type UsersPermissionsCreateRolePayload = {
  __typename?: 'UsersPermissionsCreateRolePayload';
  ok: Scalars['Boolean'];
};

export type UsersPermissionsDeleteRolePayload = {
  __typename?: 'UsersPermissionsDeleteRolePayload';
  ok: Scalars['Boolean'];
};

export type UsersPermissionsLoginInput = {
  identifier: Scalars['String'];
  password: Scalars['String'];
  provider: Scalars['String'];
};

export type UsersPermissionsLoginPayload = {
  __typename?: 'UsersPermissionsLoginPayload';
  jwt: Maybe<Scalars['String']>;
  user: UsersPermissionsMe;
};

export type UsersPermissionsMe = {
  __typename?: 'UsersPermissionsMe';
  blocked: Maybe<Scalars['Boolean']>;
  confirmed: Maybe<Scalars['Boolean']>;
  email: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  role: Maybe<UsersPermissionsMeRole>;
  username: Scalars['String'];
};

export type UsersPermissionsMeRole = {
  __typename?: 'UsersPermissionsMeRole';
  description: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  type: Maybe<Scalars['String']>;
};

export type UsersPermissionsPasswordPayload = {
  __typename?: 'UsersPermissionsPasswordPayload';
  ok: Scalars['Boolean'];
};

export type UsersPermissionsPermission = {
  __typename?: 'UsersPermissionsPermission';
  action: Scalars['String'];
  createdAt: Maybe<Scalars['DateTime']>;
  role: Maybe<UsersPermissionsRoleEntityResponse>;
  updatedAt: Maybe<Scalars['DateTime']>;
};

export type UsersPermissionsPermissionEntity = {
  __typename?: 'UsersPermissionsPermissionEntity';
  attributes: Maybe<UsersPermissionsPermission>;
  id: Maybe<Scalars['ID']>;
};

export type UsersPermissionsPermissionFiltersInput = {
  action: InputMaybe<StringFilterInput>;
  and: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>;
  createdAt: InputMaybe<DateTimeFilterInput>;
  id: InputMaybe<IdFilterInput>;
  not: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  or: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>;
  role: InputMaybe<UsersPermissionsRoleFiltersInput>;
  updatedAt: InputMaybe<DateTimeFilterInput>;
};

export type UsersPermissionsPermissionRelationResponseCollection = {
  __typename?: 'UsersPermissionsPermissionRelationResponseCollection';
  data: Array<UsersPermissionsPermissionEntity>;
};

export type UsersPermissionsRegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type UsersPermissionsRole = {
  __typename?: 'UsersPermissionsRole';
  createdAt: Maybe<Scalars['DateTime']>;
  description: Maybe<Scalars['String']>;
  name: Scalars['String'];
  permissions: Maybe<UsersPermissionsPermissionRelationResponseCollection>;
  type: Maybe<Scalars['String']>;
  updatedAt: Maybe<Scalars['DateTime']>;
  users: Maybe<UsersPermissionsUserRelationResponseCollection>;
};


export type UsersPermissionsRolePermissionsArgs = {
  filters: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type UsersPermissionsRoleUsersArgs = {
  filters: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type UsersPermissionsRoleEntity = {
  __typename?: 'UsersPermissionsRoleEntity';
  attributes: Maybe<UsersPermissionsRole>;
  id: Maybe<Scalars['ID']>;
};

export type UsersPermissionsRoleEntityResponse = {
  __typename?: 'UsersPermissionsRoleEntityResponse';
  data: Maybe<UsersPermissionsRoleEntity>;
};

export type UsersPermissionsRoleEntityResponseCollection = {
  __typename?: 'UsersPermissionsRoleEntityResponseCollection';
  data: Array<UsersPermissionsRoleEntity>;
  meta: ResponseCollectionMeta;
};

export type UsersPermissionsRoleFiltersInput = {
  and: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>;
  createdAt: InputMaybe<DateTimeFilterInput>;
  description: InputMaybe<StringFilterInput>;
  id: InputMaybe<IdFilterInput>;
  name: InputMaybe<StringFilterInput>;
  not: InputMaybe<UsersPermissionsRoleFiltersInput>;
  or: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>;
  permissions: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  type: InputMaybe<StringFilterInput>;
  updatedAt: InputMaybe<DateTimeFilterInput>;
  users: InputMaybe<UsersPermissionsUserFiltersInput>;
};

export type UsersPermissionsRoleInput = {
  description: InputMaybe<Scalars['String']>;
  name: InputMaybe<Scalars['String']>;
  permissions: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  type: InputMaybe<Scalars['String']>;
  users: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

export type UsersPermissionsUpdateRolePayload = {
  __typename?: 'UsersPermissionsUpdateRolePayload';
  ok: Scalars['Boolean'];
};

export type UsersPermissionsUser = {
  __typename?: 'UsersPermissionsUser';
  blocked: Maybe<Scalars['Boolean']>;
  confirmed: Maybe<Scalars['Boolean']>;
  createdAt: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  provider: Maybe<Scalars['String']>;
  role: Maybe<UsersPermissionsRoleEntityResponse>;
  updatedAt: Maybe<Scalars['DateTime']>;
  username: Scalars['String'];
};

export type UsersPermissionsUserEntity = {
  __typename?: 'UsersPermissionsUserEntity';
  attributes: Maybe<UsersPermissionsUser>;
  id: Maybe<Scalars['ID']>;
};

export type UsersPermissionsUserEntityResponse = {
  __typename?: 'UsersPermissionsUserEntityResponse';
  data: Maybe<UsersPermissionsUserEntity>;
};

export type UsersPermissionsUserEntityResponseCollection = {
  __typename?: 'UsersPermissionsUserEntityResponseCollection';
  data: Array<UsersPermissionsUserEntity>;
  meta: ResponseCollectionMeta;
};

export type UsersPermissionsUserFiltersInput = {
  and: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>;
  blocked: InputMaybe<BooleanFilterInput>;
  confirmationToken: InputMaybe<StringFilterInput>;
  confirmed: InputMaybe<BooleanFilterInput>;
  createdAt: InputMaybe<DateTimeFilterInput>;
  email: InputMaybe<StringFilterInput>;
  id: InputMaybe<IdFilterInput>;
  not: InputMaybe<UsersPermissionsUserFiltersInput>;
  or: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>;
  password: InputMaybe<StringFilterInput>;
  provider: InputMaybe<StringFilterInput>;
  resetPasswordToken: InputMaybe<StringFilterInput>;
  role: InputMaybe<UsersPermissionsRoleFiltersInput>;
  updatedAt: InputMaybe<DateTimeFilterInput>;
  username: InputMaybe<StringFilterInput>;
};

export type UsersPermissionsUserInput = {
  blocked: InputMaybe<Scalars['Boolean']>;
  confirmationToken: InputMaybe<Scalars['String']>;
  confirmed: InputMaybe<Scalars['Boolean']>;
  email: InputMaybe<Scalars['String']>;
  password: InputMaybe<Scalars['String']>;
  provider: InputMaybe<Scalars['String']>;
  resetPasswordToken: InputMaybe<Scalars['String']>;
  role: InputMaybe<Scalars['ID']>;
  username: InputMaybe<Scalars['String']>;
};

export type UsersPermissionsUserRelationResponseCollection = {
  __typename?: 'UsersPermissionsUserRelationResponseCollection';
  data: Array<UsersPermissionsUserEntity>;
};
