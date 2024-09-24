import { database } from "./databaseService.js";

const collection = database.collection("users");

export async function insertUser(user) {
    return collection.insertOne(user);
}

export async function readUser(email) {
    return collection.findOne({ email });
}

export async function isUserStored(email) {
    const user = await collection.findOne({ email });
    return Boolean(user);
}
