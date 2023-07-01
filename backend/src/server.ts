import express, { Application, NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { connectDB } from "./db/database";
import UserRoutes from "./routes/userRoutes";

import * as dotenv from "dotenv";
import { initiateModelWithMongoose } from "./db/initiateModel";
dotenv.config({ path: "src/config/.env" });

const app: Application = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log({ path: req.path, method: req.method });
  next();
});
app.use(cookieParser());

app.use("/api/users", UserRoutes);

async function startServer() {
  try {
    await connectDB();
    await initiateModelWithMongoose(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Listening on port: ${PORT}`);
    });
  } catch (error) {
    console.error(`Failed to start server: ${error}`);
  }
}

startServer();
