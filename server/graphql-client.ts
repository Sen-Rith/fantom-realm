import { GraphQLClient } from "graphql-request";

const spookyswapClient = new GraphQLClient(process.env.SPOOKY_SWAP);
const spiritswapClient = new GraphQLClient(process.env.SPIRIT_SWAP);

export { spookyswapClient, spiritswapClient };