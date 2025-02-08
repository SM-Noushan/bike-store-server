import express from "express";
import { StripeController } from "./stripe.controller";

const stripeRouter = express.Router();

stripeRouter.post(
  "/",
  express.raw({ type: "application/json" }),
  StripeController.stripeWebhookController,
);

export const StripeRoutes = stripeRouter;
