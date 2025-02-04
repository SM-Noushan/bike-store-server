import cors from "cors";
import router from "./app/routes";
import notFound from "./app/modules/middlewares/notFound";
import express, { Application, Request, Response } from "express";
import globalErrorHandler from "./app/modules/middlewares/globalErrorHandler";
import config from "./app/config";

const app: Application = express();

// parsers
app.use(express.json());
app.use(
  cors({
    origin: [config.clientUrl as string],
    credentials: true,
  }),
);

// application routes
app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to BikeServer!");
});

// global error handler
app.use(globalErrorHandler);
// not found route handler
app.use(notFound);

export default app;
