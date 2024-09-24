import { database } from "./database.js";

const collection = database.collection("transactions");

export async function createTransaction(transaction) {
    return collection.insertOne(transaction);
}

export async function readManyTransactions(userId, skip, limit) {
    return collection.find({ userId }, { skip, limit }).toArray();
}
