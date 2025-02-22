import { Router } from "express";
import { checkAuthMiddleware } from "#middlewares/checkAuthMiddleware.js";
import { validationMiddleware } from "#middlewares/validationMiddleware.js";
import {
    postTransaction,
    getPaginatedTransactions,
    putTransaction,
    deleteTransaction
} from "#controllers/transactionController.js";
import {
    postTransactionSchema,
    putTransactionSchema,
    deleteTransactionSchema
} from "#schemas/transactionSchema.js"

export const transactionRoutes = Router();
transactionRoutes.use(checkAuthMiddleware);
transactionRoutes.post("/transactions", validationMiddleware(postTransactionSchema), postTransaction);
transactionRoutes.get("/transactions", getPaginatedTransactions);
transactionRoutes.put("/transactions", validationMiddleware(putTransactionSchema), putTransaction);
transactionRoutes.delete("/transactions", validationMiddleware(deleteTransactionSchema), deleteTransaction);
