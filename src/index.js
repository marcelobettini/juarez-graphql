import { ApolloServer } from "apollo-server";
import { typeDefs } from "./schema.js";
import { resolvers } from "./resolvers.js";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: (err) => {
    const errorDetails = {
      message: err.message,
      locations: err.locations,
      path: err.path,
      extensions: {
        code: err.extensions.code,
        invalidArgument: err.extensions.invalidArgument,
      },
    };
    return errorDetails;
  },
});

server
  .listen()
  .then(({ url }) => console.log(`GraphQL Server running at ${url}`));
