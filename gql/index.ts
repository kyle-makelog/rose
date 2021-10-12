import { ApolloServer } from "apollo-server-micro";
import { context } from "./context";
import { resolvers } from "./resolvers";
import { typeDefs } from "./typedefs";

export default new ApolloServer({ context, typeDefs, resolvers });
