import { Schema, model } from "mongoose";
import { IOrder } from "./order.interface";

const orderSchema = new Schema<IOrder>({
  orderId: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  currency: { type: String, required: true },
  paymentStatus: { type: String, required: true },
  paymentIntent: { type: String, required: true },
  sessionId: { type: String, required: true },
  items: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
  createdAt: { type: Date, required: true },
});

export const Order = model<IOrder>("Order", orderSchema);
