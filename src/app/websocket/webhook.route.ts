import express from "express";
import { StripeRoutes } from "./stripe/stripe.routes";

const webhookRouter = express.Router();

webhookRouter.use("/stripe", StripeRoutes);

export const WebhookRoutes = webhookRouter;
