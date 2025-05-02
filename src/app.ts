import cors from "cors";
import router from "./app/routes";
import config from "./app/config";
import notFound from "./app/modules/middlewares/notFound";
import { WebhookRoutes } from "./app/websocket/webhook.route";
import express, { Application, Request, Response } from "express";
import globalErrorHandler from "./app/modules/middlewares/globalErrorHandler";

const app: Application = express();

app.use(
  cors({
    origin: [config.clientUrl as string],
    credentials: true,
  }),
);

// webhooks
app.use("/webhook", WebhookRoutes);

app.use(express.json());
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
