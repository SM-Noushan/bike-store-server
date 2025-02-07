import { Types } from "mongoose";

export interface TOrder {
  email: string;
  product: Types.ObjectId;
  quantity: number;
  totalPrice: number;
}

export type TCheckout = {
  id: string;
  quantity: number;
};
