import SmartInterval from "smartinterval";
import { ref } from "vue";
import { spiritswapClient } from "../graphql-client";
import { FtmPriceQuery } from "~~/generated/operations";
import { GET_FTM_PRICE } from "~~/graphql/queries";

const ftmPrice = ref(0);

async function getFantomPrice() {
  try {
    const res = await spiritswapClient.request<FtmPriceQuery>(GET_FTM_PRICE);
    if (!res.token.tokenDayData[0].priceUSD) return;
    ftmPrice.value = res.token.tokenDayData[0].priceUSD;
  } catch {
    //Ignore
  }
}

let fantomPriceFetcher = new SmartInterval(async () => {
  await getFantomPrice();
}, 2000);

fantomPriceFetcher.start();

export default defineEventHandler(async (event) => {
  return ftmPrice.value;
});
