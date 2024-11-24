import { Types } from "mongoose";

export interface TOrder {
  email: string;
  product: Types.ObjectId;
  quantity: number;
  totalPrice: number;
}
