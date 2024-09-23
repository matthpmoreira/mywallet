import { loginController, signupController } from "#controllers/authController.js";
import { validationMiddleware } from "#middlewares/validationMiddleware.js";
import { loginSchema, signupSchema } from "#schemas/userSchema.js";
import { Router } from "express";

export const authRouter = Router();
authRouter.post("/sign-up", validationMiddleware(signupSchema), signupController);
authRouter.post("/sign-in", validationMiddleware(loginSchema), loginController);
