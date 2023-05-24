import { NextFunction, Request, Response } from "express";
import { StatusCodes as HttpStatusCode } from "http-status-codes";
import { loginSchema } from "../../schemas/auth/login.schema";

export class LoginValidator {
  static validate(req: Request, res: Response, next: NextFunction) {
    const { error } = loginSchema.validate(req.body);

    if (error) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        message: error.message,
      });
    }

    return next();
  }
}
