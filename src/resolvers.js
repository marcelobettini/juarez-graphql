import {
  getAllCharacters,
  getCharacterByName,
  addCharacter,
  updatePhone,
} from "./services/characterService.js";

export const resolvers = {
  Query: {
    charactersCount: () => characters.length,
    getAllCharacters: (_parent, args) => getAllCharacters(args.phone),
    getCharacterByName: (_parent, { name }) => getCharacterByName(name),
  },
  Character: {
    location: ({ street, city }) => `${street} - ${city}`,
  },
  Mutation: {
    addCharacter: (_parent, args) => addCharacter(args),
    updatePhone: (_parent, { name, phone }) => updatePhone(name, phone),
  },
};
