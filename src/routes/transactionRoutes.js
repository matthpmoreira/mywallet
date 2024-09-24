import { deleteTransaction, getPaginatedTransactions, postTransaction, putTransaction } from "#controllers/transactionController.js";
import { authMiddleware } from "#middlewares/authMiddleware.js";
import { validationMiddleware } from "#middlewares/validationMiddleware.js";
import { newTransactionSchema, transactionIdSchema } from "#schemas/transactionSchema.js"
import { Router } from "express";

export const transactionRoutes = Router();
transactionRoutes.use(authMiddleware);
transactionRoutes.post("/transactions", validationMiddleware(newTransactionSchema), postTransaction);
transactionRoutes.get("/transactions", getPaginatedTransactions);
transactionRoutes.put("/transactions", validationMiddleware(transactionIdSchema), putTransaction);
transactionRoutes.delete("/transactions", validationMiddleware(transactionIdSchema), deleteTransaction)
