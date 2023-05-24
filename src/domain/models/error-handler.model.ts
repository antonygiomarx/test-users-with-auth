import { Response } from "express";

export interface ErrorHandlerService {
  handle(error: unknown, res: Response): Response;
}
