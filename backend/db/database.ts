import { MongoClient, ServerApiVersion } from "mongodb";

export async function connectDB() {
  const uri = process.env.MONGO_URI;
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  try {
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (err) {
    console.error("Failed to connect to MongoDB:", {
      error_message: err.message,
      error: err,
    });
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
