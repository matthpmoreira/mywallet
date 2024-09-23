import { signupController } from "#controllers/authController.js";
import { validationMiddleware } from "#middlewares/validationMiddleware.js";
import { signupSchema } from "#schemas/userSchema.js";
import { Router } from "express";

export const authRouter = Router();
authRouter.post("/sign-up", validationMiddleware(signupSchema), signupController);
