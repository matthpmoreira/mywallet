import { ObjectId } from "mongodb";
import { database } from "./databaseService.js";

const collection = database.collection("transactions");

export async function insertTransaction(transaction) {
    return collection.insertOne(transaction);
}

export async function isTransactionStored(id) {
    const _id = new ObjectId(id);
    const transaction = collection.findOne({ _id });
    return Boolean(transaction);
}

export async function isTransactionOwner(id, userId) {
    const _id = new ObjectId(id);
    const transaction = collection.findOne({ _id });
    return transaction.userId === userId;
}

export async function readUserTransactions(userId, page) {
    const limit = 10;
    const skip = limit * (page - 1);
    return collection.find({ userId }, { skip, limit }).toArray();
}

export async function updateTransaction(id, newTransaction) {
    const _id = new ObjectId(id);
    return collection.updateOne({ _id }, { $set: newTransaction });
}

export async function removeTransaction(id) {
    const _id = new ObjectId(id);
    return collection.deleteOne({ _id });
}
