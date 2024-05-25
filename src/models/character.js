import mongoose from "mongoose";
const characterSchema = {
  name: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
  },
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
};

const schema = new mongoose.Schema(characterSchema);
export default mongoose.model("Character", schema);
