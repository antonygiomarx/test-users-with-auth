import express, { Request, Response } from "express";
import { AuthRouter, UserRouter } from "./infrastructure/routes";

const app = express();

app.use(express.json());

app.get("/api/", (_: Request, res: Response) => {
  res.send("Hello world");
});

app.use(UserRouter);
app.use(AuthRouter);

export { app };
