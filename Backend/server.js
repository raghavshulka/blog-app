import express from "express";
import { db } from "./utils.js/mongoconnect.js";
import mainRoutes from "./routes/mainRoutes.js";
import { config } from "dotenv";
import cors from "cors"

config({
  path: "./.env",
});

const mongoURI = process.env.URI || "";
const port = process.env.PORT ;

// console.log(mongoURI)

db(mongoURI);
const app = express();
app.use(cors())
app.use(express.json());
app.use("/api/v1", mainRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

