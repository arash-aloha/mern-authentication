import dotenv from "dotenv";
import express, { Application, NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { connectDB } from "./db/database";
import UserRoutes from "./routes/userRoutes";

import { initiateModelWithMongoose } from "./db/initiateModel";
import Logging from "./logger/log";

dotenv.config({ path: "./src/config/.env" });
const app: Application = express();
const PORT = process.env.PORT || 4000;
const DB_URI = process.env.MONGO_URI;

async function startServer() {
  try {
    await connectDB(DB_URI);
    await initiateModelWithMongoose(DB_URI);
    app.listen(PORT, () => {
      Logging.info(`Listening on port: ${PORT}`);
    });
  } catch (error) {
    Logging.error(`Failed to start server:`);
    Logging.error(error);
  }
}

startServer();

app.use(cors());
app.use(express.json());
app.use((req: Request, res: Response, next: NextFunction) => {
  /** Log requests **/
  Logging.info(
    `Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`
  );

  res.on("finish", () => {
    /* Log response */
    Logging.info(
      `Response finish -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`
    );
  });
  next();
});
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* Healthcheck */
app.use("/api/ping", (req: Request, res: Response) =>
  res.status(200).json({ message: "pong" })
);
/* Routes */
app.use("/api/users", UserRoutes);

/* Error handling */
app.use((req, res, next) => {
  const error = new Error("Page not found.");
  Logging.error(error);

  return res.status(404).json({ message: error.message });
});
