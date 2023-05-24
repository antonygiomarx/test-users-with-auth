import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { UserController } from "../controllers/user.controller";
import { CreateValidator } from "../validators/user/create.validator";
import { UpdateValidator } from "../validators/user/update.validator";
import { DeleteValidator } from "../validators/user/delete.validator";
import { GetValidator } from "../validators/user/get.validator";

const router = Router();

const userController = new UserController();

router.get("/api/users", AuthMiddleware.auth, userController.getAll);

router.get(
  "/api/users/:id",
  AuthMiddleware.auth,
  GetValidator.validate,
  userController.getById
);

router.post(
  "/api/users",
  AuthMiddleware.auth,
  CreateValidator.validate,
  userController.create
);

router.put(
  "/api/users/:id",
  AuthMiddleware.auth,
  UpdateValidator.validate,
  userController.update
);

router.delete(
  "/api/users/:id",
  AuthMiddleware.auth,
  DeleteValidator.validate,
  userController.delete
);

export { router as UserRouter };
