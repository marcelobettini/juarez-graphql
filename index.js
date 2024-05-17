import { people as characters } from "./data.js";
import { ApolloServer, gql } from "apollo-server";
const typeDefs = gql`
  type Character {
    name: String!
    phone: String
    street: String!
    city: String!
    id: ID!
  }

  type Query {
    charactersCount: Int!
    getAllCharacters: [Character!]!
    # list cannot contain other than Characters and resolver returns an empty list instead of null
  }
`;

const resolvers = {
  Query: {
    charactersCount: () => characters.length,
    getAllCharacters: () => characters,
  },
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
});
server
  .listen()
  .then(({ url }) => console.log(`GraphQL Server running at ${url}`));
