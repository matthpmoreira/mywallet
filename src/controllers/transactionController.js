import http from "http-status";
import {
    insertTransaction,
    removeTransaction,
    isTransactionStored,
    isTransactionOwner,
    readUserTransactions,
    updateTransaction
} from "#services/transactionService.js";

export async function postTransaction(req, res) {
    const transaction = req.body;
    transaction.userId = res.locals.user._id;

    try {
        await insertTransaction(transaction);
        res.sendStatus(http.CREATED);
    } catch (err) {
        console.error(err);
        res.sendStatus(http.INTERNAL_SERVER_ERROR);
    }
}

export async function getPaginatedTransactions(req, res) {
    const page = req.query.page || 1;
    const userId = res.locals.user._id;

    if (page < 1) {
        return res.sendStatus(http.BAD_REQUEST);
    }

    try {
        const transactions = await readUserTransactions(userId, page);
        res.send(transactions);
    } catch (err) {
        console.error(err);
        res.sendStatus(http.INTERNAL_SERVER_ERROR);
    }
}

export async function putTransaction(req, res) {
    const updatedTransaction = req.body;
    const userId = res.locals.user._id;
    const id = updatedTransaction._id;

    try {
        if (!isTransactionStored(id)) {
            return res.sendStatus(http.NOT_FOUND);
        }

        if (!isTransactionOwner(id, userId)) {
            return res.sendStatus(http.UNAUTHORIZED);
        }
        
        await updateTransaction(transaction);
        res.sendStatus(http.NO_CONTENT);
    } catch (err) {
        console.error(err);
        res.sendStatus(http.INTERNAL_SERVER_ERROR);
    }
}

export async function deleteTransaction(req, res) {
    const userId = res.locals.user._id;
    const id = req.body._id;

    try {
        if (!isTransactionStored(id)) {
            return res.sendStatus(http.NOT_FOUND);
        }

        if (!isTransactionOwner(id, userId)) {
            return res.sendStatus(http.UNAUTHORIZED);
        }
        
        await removeTransaction(id, userId);
        res.sendStatus(http.NO_CONTENT);
    } catch (err) {
        console.error(err);
        res.sendStatus(http.INTERNAL_SERVER_ERROR);
    }
}
