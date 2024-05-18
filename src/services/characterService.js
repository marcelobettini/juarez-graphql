// src/services/characterService.js

import { UserInputError } from "apollo-server";
import { people as characters } from "./datasource.js";

export const getAllCharacters = (phone) => {
  if (!phone) return characters;
  return characters.filter((char) =>
    phone === "yes" ? char.phone : !char.phone
  );
};

export const getCharacterByName = (name) => {
  return characters.find(
    (char) => char.name.toLocaleLowerCase() === name.toLocaleLowerCase()
  );
};

export const addCharacter = ({ name, phone, street, city }) => {
  if (
    characters.find(
      (ch) => ch.name.toLocaleLowerCase() === name.toLocaleLowerCase()
    )
  )
    throw new UserInputError("Character names must be unique");

  const newCharacter = { name, phone, street, city, id: randomUUID() };
  characters.push(newCharacter);
  return newCharacter;
};

export const updatePhone = (name, phone) => {
  const characterIdx = characters.findIndex(
    (char) => char.name.toLocaleLowerCase() === name.toLocaleLowerCase()
  );
  if (characterIdx === -1) throw new UserInputError("Character not found");

  const prevData = characters[characterIdx];
  const updatedCharacter = { ...prevData, phone };
  characters[characterIdx] = updatedCharacter;
  return updatedCharacter;
};
