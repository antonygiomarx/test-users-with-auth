import { NextFunction, Request, Response } from "express";
import { createSchema } from "../../schemas/user/create.schema";
import { HttpStatusCode } from "../../utils/http-status-code.util";

export class CreateValidator {
  static validate(req: Request, res: Response, next: NextFunction) {
    const { error } = createSchema.validate(req.body);
    if (error) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        message: error.message,
      });
    }
    return next();
  }
}
