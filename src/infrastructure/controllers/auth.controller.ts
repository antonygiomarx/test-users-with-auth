import { Request, Response } from "express";
import { StatusCodes as HttpStatusCode } from "http-status-codes";
import { LoginUseCase } from "../../application/useCases/auth/login/login.usecase";
import { RegisterUseCase } from "../../application/useCases/auth/register/register.usecase";
import { DependencyRegistry } from "../config/di.config";
import { DefaultErrorHandlerService } from "../../domain/services/error/error-handler.service";

const dependencyRegistry = new DependencyRegistry();

const defaultErrorHandlerService =
  dependencyRegistry.container.resolve<DefaultErrorHandlerService>(
    DefaultErrorHandlerService.name
  );

export class AuthController {
  async login(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;

      const loginUseCase = dependencyRegistry.container.resolve<LoginUseCase>(
        LoginUseCase.name
      );

      const loginResult = await loginUseCase.execute(email, password);

      return res.status(HttpStatusCode.OK).json({ token: loginResult.token });
    } catch (error) {
      return defaultErrorHandlerService.handle(error, res);
    }
  }

  async register(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email, password } = req.body;

      const registerUseCase =
        dependencyRegistry.container.resolve<RegisterUseCase>(
          RegisterUseCase.name
        );

      const registerResult = await registerUseCase.execute(
        name,
        email,
        password
      );

      return res
        .status(HttpStatusCode.OK)
        .json({ token: registerResult.token });
    } catch (error) {
      return defaultErrorHandlerService.handle(error, res);
    }
  }
}
