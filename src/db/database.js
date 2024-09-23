import { MongoClient, ObjectId } from "mongodb";

const url = process.env.DATABASE_URL;
const client = new MongoClient(url);

try {
    await client.connect();
    console.log("Succesfully connected to database");
} catch (err) {
    console.error(err);
}

export const database = client.db();
