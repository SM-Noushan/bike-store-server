import { Schema, model } from "mongoose";
import { ProductCategory, TProduct } from "./product.interface";

const productSchema = new Schema<TProduct>({
  name: {
    type: String,
    required: [true, "Product Name is required"],
    trim: true,
  },
  brand: {
    type: String,
    required: [true, "Product Brand is required"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Product Price is required"],
    min: [0, "Price cannot be negative"],
  },
  category: {
    type: String,
    enum: Object.values(ProductCategory),
    required: [true, "Product Category is required"],
  },
  description: {
    type: String,
    required: [true, "Product Description is required"],
    trim: true,
  },
  quantity: {
    type: Number,
    required: [true, "Product Quantity is required"],
    min: [0, "Quantity cannot be negative"],
  },
  inStock: {
    type: Boolean,
    required: [true, "Product Stock is required"],
    default: function () {
      return this.quantity > 0;
    },
  },
});

export const Product = model<TProduct>("Product", productSchema);
