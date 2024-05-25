import mongoose from "mongoose";
const MONGO_URI = process.env.MONGO_URI;
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connection to MongoDB ready!"))
  .catch((err) => console.log("Connection to MongoDB failed: ", err));
