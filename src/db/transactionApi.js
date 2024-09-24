import { ObjectId } from "mongodb";
import { database } from "./database.js";

const collection = database.collection("transactions");

export async function createTransaction(transaction) {
    return collection.insertOne(transaction);
}

export async function readManyTransactions(userId, skip, limit) {
    return collection.find({ userId }, { skip, limit }).toArray();
}

export async function updateTransaction(newTransaction) {
    const _id = new ObjectId(newTransaction._id);
    delete newTransaction._id;

    return collection.updateOne({ _id }, { $set: newTransaction });
}
