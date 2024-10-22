import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "./routes.ts";

const app = express();
const port = 3000;
const mongoURI = "mongodb://localhost:27017/mydatabase";

app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/api", routes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
