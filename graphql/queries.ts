import { gql } from "graphql-request";

export const GET_FTM_PRICE = gql`
  query FTMPrice {
    token(id: "0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83") {
      id
      name
      symbol
      tokenDayData(first: 1, orderBy: date, orderDirection: desc) {
        date
        totalLiquidityUSD
        dailyVolumeUSD
        priceUSD
      }
    }
  }
`;

export const GET_TOKENS = gql`
  query Tokens(
    $skip: Int = 0
    $first: Int = 10
    $orderBy: Token_orderBy
    $orderDirection: OrderDirection
    $where: Token_filter
    $block: Block_height
    $subgraphError: _SubgraphErrorPolicy_! = deny
  ) {
    tokens(
      skip: $skip
      first: $first
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: $where
      block: $block
      subgraphError: $subgraphError
    ) {
      id
      name
      symbol
      tradeVolume
      tokenDayData(first: 2, orderBy: date, orderDirection: desc) {
        date
        totalLiquidityUSD
        dailyVolumeUSD
        priceUSD
      }
    }
  }
`;

export const SEARCH_TOKENS = gql`
  query SearchTokens($name: String, $symbol: String, $address: ID, $date: Int) {
    asName: tokens(
      where: {
        name_contains: $name
        tokenDayData_: { date: $date, totalLiquidityUSD_gte: 10000 }
      }
      orderBy: tradeVolumeUSD
      orderDirection: desc
    ) {
      id
      name
      symbol
    }
    asSymbol: tokens(
      where: {
        symbol_contains: $symbol
        tokenDayData_: { date: $date, totalLiquidityUSD_gte: 10000 }
      }
      orderBy: tradeVolumeUSD
      orderDirection: desc
    ) {
      id
      name
      symbol
    }
    asAddress: tokens(
      where: {
        id: $address
        tokenDayData_: { date: $date, totalLiquidityUSD_gte: 10000 }
      }
      orderBy: tradeVolumeUSD
      orderDirection: desc
    ) {
      id
      name
      symbol
    }
  }
`;
