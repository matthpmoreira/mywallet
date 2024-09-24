import { createTransaction, readManyTransactions } from "#db/transactionApi.js";
import http from "http-status";

export async function postTransaction(req, res) {
    const transaction = req.body;
    transaction.userId = res.locals.user._id;

    try {
        await createTransaction(transaction);
        res.sendStatus(http.CREATED);
    } catch (err) {
        console.error(err);
        res.sendStatus(http.INTERNAL_SERVER_ERROR);
    }
}

export async function getPaginatedTransactions(req, res) {
    const page = req.query.page || 1;
    
    if (page < 1) {
        return res.sendStatus(http.BAD_REQUEST);
    }
    
    const limit = 10;
    const skip = limit * (page - 1);
    const userId = res.locals.user._id;

    try {
        const transactions = await readManyTransactions(userId, skip, limit);
        res.send(transactions);
    } catch (err) {
        console.error(err);
        res.sendStatus(http.INTERNAL_SERVER_ERROR);
    }
}
