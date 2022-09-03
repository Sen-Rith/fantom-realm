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
import {
  spiritswapClient,
  spiritswapPairClient,
  spookyswapClient,
  spookyswapPairClient,
} from "~~/server/graphql-client";
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

    let spookyswapTokenPair0: TokenPair0Query = { pairDayDatas: [] };
    let spookyswapTokenPair1: TokenPair1Query = { pairDayDatas: [] };
    let spiritswapTokenPair0: TokenPair0Query = { pairDayDatas: [] };
    let spiritswapTokenPair1: TokenPair1Query = { pairDayDatas: [] };

    try {
      spookyswapTokenPair0 = await spookyswapPairClient.request<
        TokenPair0Query,
        TokenPair0QueryVariables
      >(GET_TOKEN0_PAIRS, { id, date });
    } catch {
      //Ignore
    }

    try {
      spookyswapTokenPair1 = await spookyswapPairClient.request<
        TokenPair1Query,
        TokenPair1QueryVariables
      >(GET_TOKEN1_PAIRS, { id, date });
    } catch {
      //Ignore
    }

    try {
      spiritswapTokenPair0 = await spiritswapPairClient.request<
        TokenPair0Query,
        TokenPair0QueryVariables
      >(GET_TOKEN0_PAIRS, { id, date });
    } catch {
      //Ignore
    }

    try {
      spiritswapTokenPair1 = await spiritswapPairClient.request<
        TokenPair1Query,
        TokenPair1QueryVariables
      >(GET_TOKEN1_PAIRS, { id, date });
    } catch {
      //Ignore
    }

    token.value = {
      ...spookyswapToken.token,
      tokenDayData: [
        spookyswapToken.token && spiritswapToken.token
          ? {
              date: spookyswapToken.token.tokenDayData[0].date,
              totalLiquidityUSD:
                Number(
                  spookyswapToken.token.tokenDayData[0].totalLiquidityUSD
                ) +
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
            }
          : spookyswapToken.token
          ? {
              date: spookyswapToken.token.tokenDayData[0].date,
              totalLiquidityUSD: Number(
                spookyswapToken.token.tokenDayData[0].totalLiquidityUSD
              ),
              dailyVolumeUSD: Number(
                spookyswapToken.token.tokenDayData[0].dailyVolumeUSD
              ),
              priceUSD: Number(spookyswapToken.token.tokenDayData[0].priceUSD),
              dailyTxns: Number(
                spookyswapToken.token.tokenDayData[0].dailyTxns
              ),
            }
          : {
              date: spiritswapToken.token.tokenDayData[0].date,
              totalLiquidityUSD: Number(
                spiritswapToken.token.tokenDayData[0].totalLiquidityUSD
              ),
              dailyVolumeUSD: Number(
                spiritswapToken.token.tokenDayData[0].dailyVolumeUSD
              ),
              priceUSD: Number(spiritswapToken.token.tokenDayData[0].priceUSD),
              dailyTxns: Number(
                spiritswapToken.token.tokenDayData[0].dailyTxns
              ),
            },

        spookyswapToken.token && spiritswapToken.token
          ? {
              date: spookyswapToken.token.tokenDayData[1].date,
              totalLiquidityUSD:
                Number(
                  spookyswapToken.token.tokenDayData[1].totalLiquidityUSD
                ) +
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
            }
          : spookyswapToken.token
          ? {
              date: spookyswapToken.token.tokenDayData[1].date,
              totalLiquidityUSD: Number(
                spookyswapToken.token.tokenDayData[1].totalLiquidityUSD
              ),
              dailyVolumeUSD: Number(
                spookyswapToken.token.tokenDayData[1].dailyVolumeUSD
              ),
              priceUSD: Number(spookyswapToken.token.tokenDayData[1].priceUSD),
              dailyTxns: Number(
                spookyswapToken.token.tokenDayData[1].dailyTxns
              ),
            }
          : {
              date: spiritswapToken.token.tokenDayData[0].date,
              totalLiquidityUSD: Number(
                spiritswapToken.token.tokenDayData[0].totalLiquidityUSD
              ),
              dailyVolumeUSD: Number(
                spiritswapToken.token.tokenDayData[0].dailyVolumeUSD
              ),
              priceUSD: Number(spiritswapToken.token.tokenDayData[0].priceUSD),
              dailyTxns: Number(
                spiritswapToken.token.tokenDayData[0].dailyTxns
              ),
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
  } catch (err) {
    console.log(err.message);
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
