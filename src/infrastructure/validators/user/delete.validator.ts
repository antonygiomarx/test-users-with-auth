import { NextFunction, Request, Response } from "express";
import { HttpStatusCode } from "../../utils/http-status-code.util";
import { deleteSchema } from "../../schemas/user/delete.schema";

export class DeleteValidator {
  static validate(req: Request, res: Response, next: NextFunction) {
    const { error } = deleteSchema.validate(req.params.id);
    if (error) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        message: error.message,
      });
    }
    return next();
  }
}
