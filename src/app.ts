import express, { type Request, type Response } from "express";
import notFound from "./app/middlewares/notFound";
import cors from "cors";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import { router } from "./app/routes";
import { envVars } from "./app/config/env";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: envVars.FRONTEND_URL,
    credentials: true,
  })
);

app.use("/api/v1", router);
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "welcome to our ride system",
  });
});

app.use(notFound);
app.use(globalErrorHandler);

export default app;
