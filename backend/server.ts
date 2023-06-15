import express, { Application, NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { connectDB } from "./db/database";
import UserRoutes from "./routes/userRoutes";

import * as dotenv from "dotenv";
dotenv.config({ path: "./config/.env" });

const app: Application = express();
const PORT: string = process.env.PORT;

app.use(express.json());
app.use(cors({ credentials: true }));
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log({ path: req.path, method: req.method });
  next();
});
app.use(cookieParser());

app.use("/api/users", UserRoutes);

async function startServer() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Listening on port: ${PORT}`);
    });
  } catch (error) {
    console.error(`Failed to start server: ${error}`);
  }
}

startServer();
