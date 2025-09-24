import { MongoClient, ServerApiVersion } from "mongodb";
const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

let client;
let clientPromise;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
if (!client) {
  client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  clientPromise = client.connect();
}

const dbConnect = async (collectionName) => {
  try {
    const dbClient = await clientPromise;
    const db = dbClient.db(dbName);
    return db.collection(collectionName);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    //     throw new Error("Failed to connect to database");
  }
};

export default dbConnect;
