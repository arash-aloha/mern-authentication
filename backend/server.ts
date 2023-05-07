import express, { Application, NextFunction, Request, Response } from "express";

import { connectDB } from "./db/database";
import UserRoutes from "./routes/userRoutes";

import * as dotenv from "dotenv";
dotenv.config({ path: "./config/.env" });

const app: Application = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log({ path: req.path, method: req.method });
  next();
});

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
