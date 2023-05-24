import { Request, Response } from "express";
import { StatusCodes as HttpStatusCode } from "http-status-codes";
import { UserAlreadyExistsException } from "../../domain/exceptions/users";

export class ErrorMiddleware {
  handle(error: Error, _: Request, res: Response) {
    if (error instanceof UserAlreadyExistsException) {
      return res
        .status(HttpStatusCode.BAD_REQUEST)
        .json({ error: error.message });
    }

    return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ error: "Error interno del servidor" });
  }
}
