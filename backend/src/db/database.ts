import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

export async function connectDB() {
  dotenv.config({ path: "src/config/.env" });

  const uri: string = process.env.MONGO_URI;
  const databaseName = process.env.DB;
  const collectionName = process.env.COLLECTION;
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
    const database: mongoDB.Db = client.db(databaseName);
    // prettier-ignore
    const userCollection: mongoDB.Collection = database.collection(collectionName);

    console.log(
      `Successfully connected to database: ${database.databaseName} and collection: ${userCollection.collectionName}`
    );
  } catch (error) {
    console.error("Oops... Connection to Database broke.", error);
  } finally {
    await client.close();
  }
}
