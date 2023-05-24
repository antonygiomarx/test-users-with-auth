import { Response } from "express";
import { StatusCodes as HttpStatusCode } from "http-status-codes";
import * as mongoose from "mongoose";
import {
  UserAlreadyExistsException,
  UserNotFoundException,
} from "../../exceptions/users";

export class DefaultErrorHandlerService {
  handle(error: unknown, res: Response): Response {
    if (error instanceof UserNotFoundException) {
      return res.status(HttpStatusCode.NOT_FOUND).json({
        message: error.message,
      });
    }

    if (error instanceof UserAlreadyExistsException) {
      return res.status(HttpStatusCode.CONFLICT).json({
        message: error.message,
      });
    }

    if (error instanceof mongoose.Error.CastError && error.path === "_id") {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        message: "El id no es válido",
      });
    }

    if (error instanceof Error) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        message: error.message,
      });
    }

    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: "Internal server error",
    });
  }
}
