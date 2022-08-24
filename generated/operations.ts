import * as SchemaTypes from './schema';

export type FtmPriceQueryVariables = SchemaTypes.Exact<{ [key: string]: never; }>;


export type FtmPriceQuery = { __typename?: 'Query', token?: { __typename?: 'Token', id: string, name: string, symbol: string, tokenDayData: Array<{ __typename?: 'TokenDayData', date: number, totalLiquidityUSD: any, dailyVolumeUSD: any, priceUSD: any }> } | null };

export type TokensQueryVariables = SchemaTypes.Exact<{
  skip?: SchemaTypes.InputMaybe<SchemaTypes.Scalars['Int']>;
  first?: SchemaTypes.InputMaybe<SchemaTypes.Scalars['Int']>;
  orderBy?: SchemaTypes.InputMaybe<SchemaTypes.Token_OrderBy>;
  orderDirection?: SchemaTypes.InputMaybe<SchemaTypes.OrderDirection>;
  where?: SchemaTypes.InputMaybe<SchemaTypes.Token_Filter>;
  block?: SchemaTypes.InputMaybe<SchemaTypes.Block_Height>;
  subgraphError?: SchemaTypes._SubgraphErrorPolicy_;
}>;


export type TokensQuery = { __typename?: 'Query', tokens: Array<{ __typename?: 'Token', id: string, name: string, symbol: string, tradeVolume: any, tokenDayData: Array<{ __typename?: 'TokenDayData', date: number, totalLiquidityUSD: any, dailyVolumeUSD: any, priceUSD: any }> }> };

export type SearchTokensQueryVariables = SchemaTypes.Exact<{
  name?: SchemaTypes.InputMaybe<SchemaTypes.Scalars['String']>;
  symbol?: SchemaTypes.InputMaybe<SchemaTypes.Scalars['String']>;
  address?: SchemaTypes.InputMaybe<SchemaTypes.Scalars['ID']>;
  date?: SchemaTypes.InputMaybe<SchemaTypes.Scalars['Int']>;
}>;


export type SearchTokensQuery = { __typename?: 'Query', asName: Array<{ __typename?: 'Token', id: string, name: string, symbol: string }>, asSymbol: Array<{ __typename?: 'Token', id: string, name: string, symbol: string }>, asAddress: Array<{ __typename?: 'Token', id: string, name: string, symbol: string }> };