import { randomUUID } from "node:crypto";
import { people as characters } from "./data.js";
import { ApolloServer, gql, UserInputError } from "apollo-server";
const typeDefs = gql`
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

const resolvers = {
  Query: {
    charactersCount: () => characters.length,
    getAllCharacters: (_parent, args) => {
      if (!args.phone) return characters;
      const filteredByPhone = characters.filter((char) =>
        args.phone === "yes" ? char.phone : !char.phone
      );
      return filteredByPhone;
    },
    getCharacterByName: (_parent, { name }) =>
      characters.find(
        (char) => char.name.toLocaleLowerCase() === name.toLocaleLowerCase()
      ),
  },
  Character: {
    location: ({ street, city }) => `${street} - ${city}`,
  },

  Mutation: {
    addCharacter: (_parent, args) => {
      const { name, phone, street, city } = args;
      if (
        characters.find(
          (ch) => ch.name.toLocaleLowerCase() === name.toLocaleLowerCase()
        )
      )
        throw new UserInputError("Characters must be unique");
      const newCharacter = { name, phone, street, city, id: randomUUID() };
      characters.push(newCharacter);
      return newCharacter;
    },
    updatePhone: (_parent, { name, phone }) => {
      const characterIdx = characters.findIndex(
        (char) => char.name.toLocaleLowerCase() === name.toLocaleLowerCase()
      );
      if (characterIdx === -1)
        throw new UserInputError("A name must be provided");
      /* 
      steps:
      1. acceder a los datos previos del elemento a cambiar
      2. construir un nuevo elemento con los datos previos y el nuevo telefono
      3. reemplazar el elemento anterior con el nuevo que tiene los datos actualizados
      4. retornar el elemento actualizado
      */

      const prevData = characters[characterIdx];
      const updatedCharacter = { ...prevData, phone };
      characters[characterIdx] = updatedCharacter;
      return updatedCharacter;
    },
  },
};
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
