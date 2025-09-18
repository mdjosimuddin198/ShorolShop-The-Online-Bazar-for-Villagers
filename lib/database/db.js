import { MongoClient, ServerApiVersion } from "mongodb";
const uri = process.env.MONGODB_URI;
const DbName = process.env.MONGODB_DB;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
const dbConnect = async (collectionName) => {
  await client.connect();
  return client.db(DbName).collection(collectionName);
};

export default dbConnect;
