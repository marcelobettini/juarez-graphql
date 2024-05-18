import { gql } from "apollo-server";
export const typeDefs = gql`
  enum hasPhone {
    no
    yes
  }
  type Character {
    name: String!
    phone: String
    street: String!
    city: String!
    location: String
    id: ID!
  }

  type Query {
    charactersCount: Int!
    getAllCharacters(phone: hasPhone): [Character!]!
    # list cannot contain other than Characters and resolver returns an empty list instead of null
    getCharacterByName(name: String!): Character
  }
  type Mutation {
    addCharacter(
      name: String!
      phone: String
      street: String!
      city: String!
    ): Character

    updatePhone(name: String!, phone: String!): Character
  }
`;
