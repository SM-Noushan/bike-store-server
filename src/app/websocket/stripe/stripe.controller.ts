import Stripe from "stripe";
import status from "http-status";
import config from "../../config";
import { StripeServices } from "./stripe.service";
import catchAsync from "../../modules/utils/catchAsync";
import sendResponse from "../../modules/utils/sendResponse";

const stripe = new Stripe(config.stripeSecretKey as string, {
  apiVersion: config.stripeApiVersion as undefined,
});

const stripeWebhookController = catchAsync(async (req, res) => {
  const sig = req.headers["stripe-signature"] as string;
  const endpointSecret = config.stripeEndPointSecret as string;

  const event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  let result: boolean = true;
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    result = await StripeServices.checkoutSessionCompleted(session);
  }

  sendResponse(res, {
    statusCode: result ? status.OK : status.BAD_REQUEST,
    success: result,
    message: result ? "Order stored successfully" : "Failed to store order",
    data: null,
  });
});

export const StripeController = { stripeWebhookController };
