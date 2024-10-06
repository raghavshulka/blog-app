import mongoose from "mongoose";
console.log(process.env.URI)
export const db = async (uri) =>
  await mongoose
    .connect(uri, {
      dbName: "todos",
    })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
