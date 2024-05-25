import {
  count,
  getAllCharacters,
  getCharacterByName,
  addCharacter,
  updatePhone,
  deleteCharacter,
} from "./services/characterService.js";

export const resolvers = {
  Query: {
    charactersCount: () => count(),
    getAllCharacters: (_parent, { phone }) => getAllCharacters(phone),
    getCharacterByName: (_parent, { name }) => getCharacterByName(name),
  },
  Character: {
    location: ({ street, city }) => `${street} - ${city}`,
  },
  Mutation: {
    addCharacter: (_parent, args) => addCharacter(args),
    updatePhone: (_parent, { name, phone }) => updatePhone(name, phone),
    deleteCharacter: (_parent, { name }) => deleteCharacter(name),
  },
};
