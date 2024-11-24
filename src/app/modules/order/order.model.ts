import { TOrder } from "./order.interface";
import { Product } from "../product/product.model";
import { CallbackError, Schema, Types, model } from "mongoose";

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

// middleware utility
async function handleInventory(
  productId: Types.ObjectId,
  quantity: number,
  isCheckOnly: boolean = false,
) {
  const product = await Product.findById(productId);

  if (!product) throw new Error("Bike not found");

  // Check if sufficient stock is available
  if (product.quantity < quantity) {
    throw new Error("Insufficient stock available");
  }

  // Update product inventory
  if (!isCheckOnly) {
    product.quantity -= quantity;

    // Set inStock to false if quantity reaches zero
    if (product.quantity <= 0) {
      product.inStock = false;
    }

    await product.save();
  }
}

// Middleware to check if the sufficient product exists
orderSchema.pre("save", async function (next) {
  try {
    await handleInventory(this.product, this.quantity, true);
    next();

    next();
  } catch (error) {
    next(error as CallbackError);
  }
});

// Middleware to handle inventory(quantity) logic
orderSchema.post("save", async function (doc, next) {
  try {
    await handleInventory(doc.product, doc.quantity);
    next();
    next();
  } catch (error) {
    next(error as CallbackError);
  }
});

export const Order = model<TOrder>("Order", orderSchema);
