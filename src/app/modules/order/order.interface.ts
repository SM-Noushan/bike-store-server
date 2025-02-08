import { Document, Schema } from "mongoose";

interface OrderItem {
  product: Schema.Types.ObjectId;
  quantity: number;
}

export interface IOrder {
  orderId: string;
  email: string;
  totalAmount: number;
  currency: string;
  paymentStatus: string;
  paymentIntent: string;
  sessionId: string;
  createdAt: Date;
  items: OrderItem[];
}

export interface IOrderDocument extends IOrder, Document {}

export type TCheckout = {
  id: string;
  quantity: number;
};
