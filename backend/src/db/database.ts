import { MongoClient, ServerApiVersion } from "mongodb";
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

// export async function connectDB() {
//   dotenv.config({ path: "./config/.env" });
//   const uri: string = process.env.MONGO_URI;
//   const client: MongoClient = new MongoClient(uri, {
//     serverApi: {
//       version: ServerApiVersion.v1,
//       strict: true,
//       deprecationErrors: true,
//     },
//   });

//   try {
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB!"
//     );
//   } catch (err) {
//     console.error("Failed to connect to MongoDB:", {
//       error_message: err.message,
//       error: err,
//     });
//   } finally {
//     await client.close();
//   }
// }

export const collections: { users?: mongoDB.Collection } = {};

export async function connectDB() {
  dotenv.config({ path: "./config/.env" });
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
