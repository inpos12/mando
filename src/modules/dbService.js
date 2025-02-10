import client from "@/config/dbconfig";

export async function getCollection(collectionName) {
  try {
    await client.connect();
    const db = client.db("mando");
    return db.collection(collectionName);
  } catch (error) {
    console.error("DB connection failed:", error);
    throw new Error("Failed to connect to database");
  }
}
