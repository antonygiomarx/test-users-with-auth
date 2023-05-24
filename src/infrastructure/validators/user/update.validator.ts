import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { updateSchema } from "../../schemas/user/update.schema";
import { HttpStatusCode } from "../../utils/http-status-code.util";

export class UpdateValidator {
  static validate(req: Request, res: Response, next: NextFunction) {
    const { error: paramError } = Joi.string()
      .required()
      .validate(req.params.id);
    if (paramError) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        message: "El ID es requerido",
      });
    }

    const { error: bodyError } = updateSchema.validate(req.body);
    if (bodyError) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        message: bodyError.message,
      });
    }

    return next();
  }
}
