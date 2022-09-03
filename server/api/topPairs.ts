import SmartInterval from "smartinterval";
import { ref } from "vue";
import { GET_PAIRS } from "~~/graphql/queries";
import { spiritswapClient, spookyswapClient } from "../graphql-client";
import { TopPairsQuery, TopPairsQueryVariables } from "~~/generated/operations";
import moment from "moment";

const topPairs = ref<TopPairsQuery["pairDayDatas"]>([]);

async function getTopPairs() {
  try {
    let tokenPairs: TopPairsQuery["pairDayDatas"] = [];
    const date = moment.utc().startOf("day").unix();

    const spookyswapPairs = await spookyswapClient.request<
      TopPairsQuery,
      TopPairsQueryVariables
    >(GET_PAIRS, { date });
    const spiritswapPairs = await spiritswapClient.request<
      TopPairsQuery,
      TopPairsQueryVariables
    >(GET_PAIRS, { date });

    spookyswapPairs.pairDayDatas.forEach((token) => {
      const spiritswapPair = spiritswapPairs.pairDayDatas.find(
        (p) =>
          p.token0.id === token.token0.id && p.token1.id === token.token1.id
      );
      if (!spiritswapPair) {
        tokenPairs.push({
          ...token,
          reserveUSD: Number(token.reserveUSD),
          dailyVolumeUSD: Number(token.dailyVolumeUSD),
        });
      } else {
        tokenPairs.push({
          ...token,
          reserveUSD:
            Number(spiritswapPair.reserveUSD) + Number(token.reserveUSD),
          dailyVolumeUSD:
            Number(spiritswapPair.dailyVolumeUSD) +
            Number(token.dailyVolumeUSD),
        });
      }
    });

    spiritswapPairs.pairDayDatas.forEach((token) => {
      const spookyswapPair = spookyswapPairs.pairDayDatas.find(
        (p) =>
          p.token0.id === token.token0.id && p.token1.id === token.token1.id
      );
      if (spookyswapPair) return;
      tokenPairs.push({
        ...token,
        reserveUSD: Number(token.reserveUSD),
        dailyVolumeUSD: Number(token.dailyVolumeUSD),
      });
    });
    
    tokenPairs = tokenPairs.sort((a, b) => b.dailyVolumeUSD - a.dailyVolumeUSD);
    tokenPairs = tokenPairs.slice(0, 10);
    topPairs.value = tokenPairs;
  } catch {
    //Ignore
  }
}

let topPairsFetcher = new SmartInterval(async () => {
  await getTopPairs();
}, 360000);

topPairsFetcher.start();

export default defineEventHandler(async (event) => {
  return topPairs.value;
});
