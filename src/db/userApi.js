import { database } from "./database.js";

const collection = database.collection("users");

export async function createUser(user) {
    return collection.insertOne(user);
}

export async function readUser({ email }) {
    return collection.findOne({ email });
}
