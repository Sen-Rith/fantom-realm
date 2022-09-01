import {
  GET_TOKEN,
  GET_TOKEN0_PAIRS,
  GET_TOKEN1_PAIRS,
} from "~~/graphql/queries";
import { ref } from "vue";
import {
  TokenPair0Query,
  TokenPair0QueryVariables,
  TokenPair1Query,
  TokenPair1QueryVariables,
  TokenQuery,
  TokenQueryVariables,
} from "~~/generated/operations";
import { spiritswapClient, spookyswapClient } from "~~/server/graphql-client";
import { Token, TokenDayData } from "~~/generated/schema";
import moment from "moment";

async function getToken(id: string) {
  try {
    const token = ref<Volume>();
    const date = moment.utc().startOf("day").unix();
    const spookyswapToken = await spookyswapClient.request<
      TokenQuery,
      TokenQueryVariables
    >(GET_TOKEN, {
      id,
    });
    const spiritswapToken = await spiritswapClient.request<
      TokenQuery,
      TokenQueryVariables
    >(GET_TOKEN, {
      id,
    });
    const spookyswapTokenPair0 = await spookyswapClient.request<
      TokenPair0Query,
      TokenPair0QueryVariables
    >(GET_TOKEN0_PAIRS, { id, date });
    const spookyswapTokenPair1 = await spookyswapClient.request<
      TokenPair1Query,
      TokenPair1QueryVariables
    >(GET_TOKEN1_PAIRS, { id, date });
    const spiritswapTokenPair0 = await spiritswapClient.request<
      TokenPair0Query,
      TokenPair0QueryVariables
    >(GET_TOKEN0_PAIRS, { id, date });
    const spiritswapTokenPair1 = await spiritswapClient.request<
      TokenPair1Query,
      TokenPair1QueryVariables
    >(GET_TOKEN1_PAIRS, { id, date });

    token.value = {
      ...spookyswapToken.token,
      tokenDayData: [
        {
          date: spookyswapToken.token.tokenDayData[0].date,
          totalLiquidityUSD:
            Number(spookyswapToken.token.tokenDayData[0].totalLiquidityUSD) +
            Number(spiritswapToken.token.tokenDayData[0].totalLiquidityUSD),
          dailyVolumeUSD:
            Number(spookyswapToken.token.tokenDayData[0].dailyVolumeUSD) +
            Number(spiritswapToken.token.tokenDayData[0].dailyVolumeUSD),
          priceUSD:
            Number(spookyswapToken.token.tokenDayData[0].priceUSD) +
            Number(spiritswapToken.token.tokenDayData[0].priceUSD),
          dailyTxns:
            Number(spookyswapToken.token.tokenDayData[0].dailyTxns) +
            Number(spiritswapToken.token.tokenDayData[0].dailyTxns),
        },
        {
          date: spookyswapToken.token.tokenDayData[1].date,
          totalLiquidityUSD:
            Number(spookyswapToken.token.tokenDayData[1].totalLiquidityUSD) +
            Number(spiritswapToken.token.tokenDayData[1].totalLiquidityUSD),
          dailyVolumeUSD:
            Number(spookyswapToken.token.tokenDayData[1].dailyVolumeUSD) +
            Number(spiritswapToken.token.tokenDayData[1].dailyVolumeUSD),
          priceUSD:
            Number(spookyswapToken.token.tokenDayData[1].priceUSD) +
            Number(spiritswapToken.token.tokenDayData[1].priceUSD),
          dailyTxns:
            Number(spookyswapToken.token.tokenDayData[1].dailyTxns) +
            Number(spiritswapToken.token.tokenDayData[1].dailyTxns),
        },
      ],
      pairQuote: [
        ...spookyswapTokenPair0.pairDayDatas.map(
          ({ dailyVolumeUSD, reserveUSD, ...data }) => {
            return {
              ...data,
              reserveUSD: Number(reserveUSD),
              volume: Number(dailyVolumeUSD),
            };
          }
        ),
        ...spookyswapTokenPair1.pairDayDatas.map(
          ({ dailyVolumeUSD, reserveUSD, ...data }) => {
            return {
              ...data,
              reserveUSD: Number(reserveUSD),
              volume: Number(dailyVolumeUSD),
            };
          }
        ),
      ],
    };
    spiritswapTokenPair0.pairDayDatas.map(
      ({ dailyVolumeUSD, reserveUSD, ...data }) => {
        const pair = token.value.pairQuote.findIndex(
          (i) =>
            i.token0.id === data.token0.id && i.token1.id === data.token1.id
        );
        if (pair >= 0) {
          token.value.pairQuote[pair].reserveUSD += Number(reserveUSD);
          token.value.pairQuote[pair].volume += Number(dailyVolumeUSD);
        } else {
          token.value.pairQuote.push({
            ...data,
            reserveUSD: Number(reserveUSD),
            volume: Number(dailyVolumeUSD),
          });
        }
      }
    );
    spiritswapTokenPair1.pairDayDatas.map(
      ({ dailyVolumeUSD, reserveUSD, ...data }) => {
        const pair = token.value.pairQuote.findIndex(
          (i) =>
            i.token0.id === data.token0.id && i.token1.id === data.token1.id
        );
        if (pair >= 0) {
          token.value.pairQuote[pair].reserveUSD += Number(reserveUSD);
          token.value.pairQuote[pair].volume += Number(dailyVolumeUSD);
        } else {
          token.value.pairQuote.push({
            ...data,
            reserveUSD: Number(reserveUSD),
            volume: Number(dailyVolumeUSD),
          });
        }
      }
    );
    token.value = {
      ...token.value,
      pairQuote: token.value.pairQuote.sort((a, b) => b.volume - a.volume),
    };
    token.value = {
      ...token.value,
      pairQuote: token.value.pairQuote.slice(0, 10),
    };
    return token.value;
  } catch {
    return null;
  }
}

export default defineEventHandler(async (event) => {
  const token = await getToken(event.context.params.token);
  return token;
});

type Volume = {
  id: string;
  name: string;
  tokenDayData: Partial<TokenDayData>[];
  pairQuote: {
    reserveUSD: number;
    token0: Partial<Token>;
    token1: Partial<Token>;
    volume: number;
  }[];
};
