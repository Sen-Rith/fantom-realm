import SmartInterval from "smartinterval";
import { ref } from "vue";
import { GET_TOKENS } from "~~/graphql/queries";
import { spiritswapClient, spookyswapClient } from "../graphql-client";
import { TokensQuery, TokensQueryVariables } from "~~/generated/operations";

const topTokens = ref([]);

async function getTopTokens() {
  try {
    let tokens = [];

    const spookyswapTokens = await spookyswapClient.request<
      TokensQuery,
      TokensQueryVariables
    >(GET_TOKENS, {
      first: 10,
      orderBy: "tradeVolumeUSD",
      orderDirection: "desc",
      where: {
        tokenDayData_: {
          dailyVolumeUSD_gt: 0,
        },
      },
    });
    const spiritswapTokens = await spiritswapClient.request<
      TokensQuery,
      TokensQueryVariables
    >(GET_TOKENS, {
      first: 10,
      orderBy: "tradeVolumeUSD",
      orderDirection: "desc",
      where: {
        tokenDayData_: {
          dailyVolumeUSD_gt: 0,
        },
      },
    });

    spookyswapTokens.tokens.forEach((token) => {
      const spiritswapToken = spiritswapTokens.tokens.find(
        (t) => t.id === token.id
      );
      if (!spiritswapToken) {
        tokens.push({
          ...token,
          tokenDayData: [
            {
              ...token.tokenDayData[0],
              totalLiquidityUSD: Number(
                token.tokenDayData[0].totalLiquidityUSD
              ),
              dailyVolumeUSD: Number(token.tokenDayData[0].dailyVolumeUSD),
              priceUSD: Number(token.tokenDayData[0].priceUSD),
            },
            {
              ...token.tokenDayData[1],
              totalLiquidityUSD: Number(
                token.tokenDayData[1].totalLiquidityUSD
              ),
              dailyVolumeUSD: Number(token.tokenDayData[1].dailyVolumeUSD),
              priceUSD: Number(token.tokenDayData[1].priceUSD),
            },
          ],
        });
      } else {
        tokens.push({
          ...token,
          tokenDayData: [
            {
              ...token.tokenDayData[0],
              totalLiquidityUSD:
                Number(token.tokenDayData[0].totalLiquidityUSD) +
                Number(spiritswapToken.tokenDayData[0].totalLiquidityUSD),
              dailyVolumeUSD:
                Number(token.tokenDayData[0].dailyVolumeUSD) +
                Number(spiritswapToken.tokenDayData[0].dailyVolumeUSD),
              priceUSD: Number(token.tokenDayData[0].priceUSD),
            },
            {
              ...token.tokenDayData[1],
              totalLiquidityUSD:
                Number(token.tokenDayData[1].totalLiquidityUSD) +
                Number(spiritswapToken.tokenDayData[1].totalLiquidityUSD),
              dailyVolumeUSD: Number(token.tokenDayData[1].dailyVolumeUSD),
              priceUSD: Number(token.tokenDayData[1].priceUSD),
            },
          ],
        });
      }
    });

    spiritswapTokens.tokens.forEach((token) => {
      const spiritswapToken = tokens.find((t) => t.id === token.id);
      if (spiritswapToken) return;
      tokens.push({
        ...token,
        tokenDayData: [
          {
            ...token.tokenDayData[0],
            totalLiquidityUSD: Number(token.tokenDayData[0].totalLiquidityUSD),
            dailyVolumeUSD: Number(token.tokenDayData[0].dailyVolumeUSD),
            priceUSD: Number(token.tokenDayData[0].priceUSD),
          },
          {
            ...token.tokenDayData[1],
            totalLiquidityUSD: Number(token.tokenDayData[1].totalLiquidityUSD),
            dailyVolumeUSD: Number(token.tokenDayData[1].dailyVolumeUSD),
            priceUSD: Number(token.tokenDayData[1].priceUSD),
          },
        ],
      });
    });
    
    tokens = tokens.sort(
      (a, b) =>
        b.tokenDayData[0].dailyVolumeUSD - a.tokenDayData[0].dailyVolumeUSD
    );
    tokens = tokens.slice(0, 10);
    topTokens.value = tokens;
  } catch {
    //Ignore
  }
}

let topTokensFetcher = new SmartInterval(async () => {
  await getTopTokens();
}, 2000);

topTokensFetcher.start();

export default defineEventHandler(async (event) => {
  return topTokens.value;
});
