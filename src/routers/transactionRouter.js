import { getPaginatedTransactions, postTransaction } from "#controllers/transactionController.js";
import { authMiddleware } from "#middlewares/authMiddleware.js";
import { validationMiddleware } from "#middlewares/validationMiddleware.js";
import {transactionSchema} from "#schemas/transactionSchema.js"
import { Router } from "express";

export const transactionRouter = Router();
transactionRouter.use(authMiddleware);
transactionRouter.post("/transactions", validationMiddleware(transactionSchema), postTransaction);
transactionRouter.get("/transactions", getPaginatedTransactions);
