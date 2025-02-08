import Stripe from "stripe";
import { Types } from "mongoose";
import config from "../../config";
import { OrderServices } from "../../modules/order/order.service";
import { IOrder, TCheckout } from "../../modules/order/order.interface";

const stripe = new Stripe(config.stripeSecretKey as string, {
  apiVersion: process.env.STRIPE_API_VERSION as undefined,
});

const checkoutSessionCompleted = async (session: Stripe.Checkout.Session) => {
  const products = JSON.parse(session?.metadata?.products as string);
  const order: IOrder = {
    orderId: session.id,
    email: session?.metadata?.email as string,
    totalAmount: (session.amount_total as number) / 100,
    currency: session.currency as string,
    paymentStatus: session.payment_status,
    paymentIntent: session.payment_intent as string,
    sessionId: session.id,
    createdAt: new Date(session.created * 1000),
    items: products.map((item: TCheckout) => ({
      product: new Types.ObjectId(item?.id),
      quantity: item.quantity,
    })),
  };

  const orderCreated = await OrderServices.createOrderIntoDB(order);

  if (!orderCreated) {
    await stripe.checkout.sessions.expire(session.id);
    return false;
  }
  return true;
};

export const StripeServices = { checkoutSessionCompleted };
