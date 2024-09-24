import { createTransaction } from "#db/transactionApi.js";
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
