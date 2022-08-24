import { SEARCH_TOKENS } from "~~/graphql/queries";
import {
  SearchTokensQuery,
  SearchTokensQueryVariables,
} from "~~/generated/operations";
import { spiritswapClient, spookyswapClient } from "~~/server/graphql-client";
import lodash from "lodash";

async function searchTokens(search: string) {
  try {
    const queryOption: SearchTokensQueryVariables = {
      name: search.replace(/\w\S*/g, (w) =>
        w.replace(/^\w/, (c) => c.toUpperCase())
      ),
      symbol: search.toUpperCase(),
      address: search.toLowerCase(),
      date: new Date(new Date().toISOString().split('T')[0]).getTime() / 1000,
    };
    const spookyswapTokens = await spookyswapClient.request<
      SearchTokensQuery,
      SearchTokensQueryVariables
    >(SEARCH_TOKENS, queryOption);
    const spiritswapTokens = await spiritswapClient.request<
      SearchTokensQuery,
      SearchTokensQueryVariables
    >(SEARCH_TOKENS, queryOption);
    const tokens = lodash.uniqBy(
      [
        ...spookyswapTokens.asAddress,
        ...spookyswapTokens.asName,
        ...spookyswapTokens.asSymbol,
        ...spiritswapTokens.asAddress,
        ...spiritswapTokens.asName,
        ...spiritswapTokens.asSymbol,
      ],
      "id"
    );
    return tokens;
  } catch  {
    return [];
    // Ignore
  }
}

export default defineEventHandler(async (event) => {
  if (!event.context.params.search) return [];
  const tokens = await searchTokens(event.context.params.search);
  return tokens;
});
