import { NextFunction, Request, Response } from "express";
import { StatusCodes as HttpStatusCode } from "http-status-codes";
import { DependencyRegistry } from "../config/di.config";
import { TokenService } from "../../domain/services/auth/token/token.service";

export class AuthMiddleware {
  public static async auth(req: Request, res: Response, next: NextFunction) {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(HttpStatusCode.FORBIDDEN).json({
        message: "No token provided",
      });
    }

    const dependencyRegistry = new DependencyRegistry();
    const tokenService = dependencyRegistry.container.resolve<TokenService>(
      TokenService.name
    );

    try {
      req.body.user = await tokenService.verify(token);
      return next();
    } catch (error) {
      return res.status(HttpStatusCode.FORBIDDEN).json({
        message: "Token invalido",
      });
    }
  }
}
