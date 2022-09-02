import { GraphQLClient } from "graphql-request";

const spookyswapClient = new GraphQLClient(process.env.SPOOKY_SWAP);
const spiritswapClient = new GraphQLClient(process.env.SPIRIT_SWAP);
const spookyswapPairClient = new GraphQLClient(process.env.SPOOKY_SWAP, {
  timeout: 3000,
});
const spiritswapPairClient = new GraphQLClient(process.env.SPIRIT_SWAP, {
  timeout: 2000,
});

export {
  spookyswapClient,
  spiritswapClient,
  spookyswapPairClient,
  spiritswapPairClient,
};
