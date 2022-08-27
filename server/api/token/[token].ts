import { GET_TOKEN } from "~~/graphql/queries";
import { ref } from "vue";
import { TokenQuery, TokenQueryVariables } from "~~/generated/operations";
import { spiritswapClient, spookyswapClient } from "~~/server/graphql-client";
import * as lodash from "lodash";
import { Token, TokenDayData } from "~~/generated/schema";

async function getToken(id: string) {
  try {
    const token = ref<Volume>();
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
        ...spookyswapToken.token.pairQuote.map(
          ({ pairHourData, reserveUSD, ...data }) => {
            return {
              ...data,
              reserveUSD: Number(reserveUSD),
              volume: pairHourData.reduce((previousValue, currentValue) => {
                return previousValue + Number(currentValue.hourlyVolumeUSD);
              }, 0),
            };
          }
        ),
      ],
    };
    spiritswapToken.token.pairQuote.map(
      ({ pairHourData, reserveUSD, ...data }) => {
        const pair = token.value.pairQuote.findIndex(
          (i) =>
            i.token0.id === data.token0.id && i.token1.id === data.token1.id
        );
        if (pair) {
          token.value.pairQuote[0].reserveUSD += Number(reserveUSD);
          token.value.pairQuote[0].volume = pairHourData.reduce(
            (previousValue, currentValue) => {
              return previousValue + Number(currentValue.hourlyVolumeUSD);
            },
            token.value.pairQuote[0].volume
          );
        } else {
          token.value.pairQuote.push({
            ...data,
            reserveUSD: Number(reserveUSD),
            volume: pairHourData.reduce((previousValue, currentValue) => {
              return previousValue + Number(currentValue.hourlyVolumeUSD);
            }, 0),
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
    //Ignore
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
