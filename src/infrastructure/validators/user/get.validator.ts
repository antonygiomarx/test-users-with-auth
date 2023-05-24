import { NextFunction, Request, Response } from "express";
import { getSchema } from "../../schemas/user/get.schema";
import { HttpStatusCode } from "../../utils/http-status-code.util";

export class GetValidator {
  static validate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Response | void {
    const { error } = getSchema.validate(req.params.id);
    if (error) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        message: error.message,
      });
    }

    return next();
  }
}
