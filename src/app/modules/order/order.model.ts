import { Schema, model } from "mongoose";
import { TOrder } from "./order.interface";

const orderSchema = new Schema<TOrder>(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product Id is required"],
    },
    quantity: {
      type: Number,
      required: [true, "Bike quantity is required"],
    },
    totalPrice: {
      type: Number,
      required: [true, "Total Price is required"],
    },
  },
  { timestamps: true },
);

export const Order = model<TOrder>("Order", orderSchema);
