import { NextFunction, Request, Response } from "express";
import { StatusCodes as HttpStatusCode } from "http-status-codes";
import { registerSchema } from "../../schemas/auth/register.schema";

export class RegisterValidator {
  static validate(req: Request, res: Response, next: NextFunction) {
    const { error } = registerSchema.validate(req.body);
    if (error) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        message: error.message,
      });
    }
    return next();
  }
}
