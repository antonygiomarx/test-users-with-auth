import { Router } from "express";
import { LoginValidator } from "../validators/auth/login.validator";
import { RegisterValidator } from "../validators/auth/register.validator";
import { AuthController } from "../controllers/auth.controller";

const authRoutes = Router();

const authController = new AuthController();

authRoutes.post(
  "/api/auth/login",
  LoginValidator.validate,
  authController.login
);

authRoutes.post(
  "/api/auth/register",
  RegisterValidator.validate,
  authController.register
);

export { authRoutes as AuthRouter };
