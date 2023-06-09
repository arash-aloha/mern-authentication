import * as mongoDB from "mongodb";

export async function connectDB(uri: string) {
  const databaseName = process.env.DB;
  const collectionName = process.env.COLLECTION;
  const databaseOptions = {
    useNewUrlParser: true,
    // useUnifiedTopology: true,
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

    console.log(`Successfully connected to database: ${database.databaseName}`);
    console.log(`collection: ${userCollection.collectionName}`);
  } catch (error) {
    console.error("Oops... Connection to Database broke.", error);
  } finally {
    await client.close();
  }
}
