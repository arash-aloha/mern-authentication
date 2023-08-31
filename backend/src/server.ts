import dotenv from "dotenv";
import express, { Express, NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import { connectDB } from "./db/database";
import UserRoutes from "./routes/userRoutes";

import { initiateModelWithMongoose } from "./db/initiateModel";
import Logging from "./logger/log";

dotenv.config({ path: "./src/config/.env" });
const app: Express = express();
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

// middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());
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

/* Healthcheck */
app.use("/api/ping", (req: Request, res: Response) =>
  res.status(200).json({ message: "pong" })
);
/* Routes */
app.use("/api", UserRoutes);

/* Error handling */
app.use((req, res, next) => {
  const error = new Error("Page not found.");
  Logging.error(error);

  return res.status(404).json({ message: error.message });
});

app.use(express.static(path.resolve("../frontend/build/")));
app.get("*", (req, res) => {
  console.log("* is being called...");
  res.sendFile(path.resolve("../frontend/build/index.html"));
});
