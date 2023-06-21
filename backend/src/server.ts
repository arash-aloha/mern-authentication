import express, { Application, NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { connectDB } from "./db/database";
import UserRoutes from "./routes/userRoutes";

import * as dotenv from "dotenv";
import { connectModelToMongoose } from "./models/UserModel";
dotenv.config({ path: "src/config/.env" });

const app: Application = express();
const PORT: string = process.env.PORT;

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
    await connectModelToMongoose(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Listening on port: ${PORT}`);
    });
  } catch (error) {
    console.error(`Failed to start server: ${error}`);
  }
}

startServer();
