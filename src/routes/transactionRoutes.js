import { deleteTransaction, getPaginatedTransactions, postTransaction, putTransaction } from "#controllers/transactionController.js";
import { authMiddleware } from "#middlewares/authMiddleware.js";
import { validationMiddleware } from "#middlewares/validationMiddleware.js";
import { transactionSchema } from "#schemas/transactionSchema.js"
import { Router } from "express";

export const transactionRoutes = Router();
transactionRoutes.use(authMiddleware);
transactionRoutes.post("/transactions", validationMiddleware(transactionSchema), postTransaction);
transactionRoutes.get("/transactions", getPaginatedTransactions);
transactionRoutes.put("/transactions", validationMiddleware(transactionSchema), putTransaction);
transactionRoutes.delete("/transactions", deleteTransaction)
