import { Schema, model } from "mongoose";
import { ProductCategory, TProduct } from "./product.interface";

const productSchema = new Schema<TProduct>(
  {
    image: {
      type: String,
      required: [true, "Product Image is required"],
    },
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
    model: {
      type: String,
      required: [true, "Product Model is required"],
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
  },
  { timestamps: true },
);

productSchema.pre("updateOne", async function (next) {
  const update = this.getUpdate() as {
    $inc?: { quantity?: number };
    $set?: { inStock?: boolean };
  };

  if (update?.$inc?.quantity !== undefined) {
    const product = await Product.findOne(this.getQuery());

    if (product) {
      const newStock = product.quantity + update.$inc.quantity;

      if (newStock <= 0) {
        update.$set = update.$set || {};
        update.$set.inStock = false;
      }
    }
  }

  next();
});

export const Product = model<TProduct>("Product", productSchema);
