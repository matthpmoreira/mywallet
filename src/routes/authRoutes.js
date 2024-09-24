import { loginController, signupController } from "#controllers/authController.js";
import { validationMiddleware } from "#middlewares/validationMiddleware.js";
import { loginSchema, signupSchema } from "#schemas/authSchema.js";
import { Router } from "express";

export const authRoutes = Router();
authRoutes.post("/sign-up", validationMiddleware(signupSchema), signupController);
authRoutes.post("/sign-in", validationMiddleware(loginSchema), loginController);
