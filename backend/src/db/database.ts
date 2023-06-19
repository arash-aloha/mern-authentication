import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

export const collections: { users?: mongoDB.Collection } = {};
export async function connectDB() {
  dotenv.config({ path: "src/config/.env" });

  const uri: string = process.env.MONGO_URI;
  const databaseName = process.env.DB;
  const collectionName = process.env.COLLECTION;

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(uri);

  try {
    await client.connect();
    const database: mongoDB.Db = await client.db(databaseName);
    const userCollection: mongoDB.Collection = await database.collection(
      collectionName
    );
    collections.users = userCollection;
    console.log(
      `Successfully connected to database: ${database.databaseName} and collection: ${userCollection.collectionName}`
    );
  } catch (error) {
    console.error("Oops... Connection to Database broke.", error);
  } finally {
    await client.close();
  }
}
