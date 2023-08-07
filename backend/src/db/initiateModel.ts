import Logging from "../logger/log";
import mongoose from "mongoose";

export async function initiateModelWithMongoose(mongoDbUri: string) {
  try {
    await mongoose.connect(mongoDbUri);
    Logging.warn(`Successfully initiated with Mongoose.`);
  } catch (error) {
    Logging.error(`Something went wrong when connecting with Mongoose!`);
    Logging.error(error);
  }
}
