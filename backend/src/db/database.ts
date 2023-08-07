import * as mongoDB from "mongodb";
import Logging from "../logger/log";

export async function connectDB(uri: string) {
  const databaseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    monitorCommands: true,
  };

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    uri,
    databaseOptions
  );

  try {
    await client.connect();
    Logging.warn(`Successfully connected to Database.`);
  } catch (error) {
    Logging.error("Oops... Connection to Database broke.");
    Logging.error(error);
  } finally {
    await client.close();
  }
}
