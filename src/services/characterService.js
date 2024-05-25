import Character from "../models/character.js";

import { UserInputError } from "apollo-server";
export const count = async () => Character.collection.countDocuments();

export const getAllCharacters = async (phone) => {
  if (!phone) return await Character.find();
  return Character.find({ phone: { $exists: phone === "yes" } });
};

export const getCharacterByName = async (name) => {
  console.log(name);
  const pattern = new RegExp(name, "i");
  return await Character.find({ name: pattern });
};

export const addCharacter = async ({ name, phone, street, city }) => {
  const newCharacter = new Character({ name, phone, street, city });
  return await newCharacter.save();
};

export const updatePhone = async (name, phone) => {
  const characterToUpdate = await Character.findOne({ name });
  if (!characterToUpdate) return null;
  characterToUpdate.phone = phone;
  return await characterToUpdate.save();
};

export const deleteCharacter = async (name) => {
  const characterToDelete = await Character.find({ name });

  if (!characterToDelete) return null;
  return await Character.findByIdAndDelete(characterToDelete[0]._id);
};
