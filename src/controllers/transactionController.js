import { createTransaction, dbDeleteTransaction, readManyTransactions, updateTransaction } from "#services/transactionService.js";
import http from "http-status";

export async function postTransaction(req, res) {
    const transaction = req.body;
    transaction.userId = res.locals.user._id;
    delete transaction._id;

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

export async function putTransaction(req, res) {
    const transaction = req.body;
    const userId = res.locals.user._id;

    const isAuthorized = userId === transaction.userId;
    if (!isAuthorized) {
        return res.sendStatus(http.UNAUTHORIZED);
    }

    try {
        const result = await updateTransaction(transaction);

        if (result.matchedCount === 0) {
            return res.sendStatus(http.NOT_FOUND);
        }

        res.sendStatus(http.NO_CONTENT);
    } catch (err) {
        console.error(err);
        res.sendStatus(http.INTERNAL_SERVER_ERROR);
    }
}

export async function deleteTransaction(req, res) {
    const _id = req.body._id;
    const userId = res.locals.user._id;

    try {
        const result = await dbDeleteTransaction(_id, userId);

        if (result.deletedCount === 0) {
            res.sendStatus(http.NOT_FOUND);
        }

        res.sendStatus(http.NO_CONTENT);
    } catch (err) {
        console.error(err);
        res.sendStatus(http.INTERNAL_SERVER_ERROR);
    }
}
