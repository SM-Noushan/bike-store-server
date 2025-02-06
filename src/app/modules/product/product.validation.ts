import { z } from "zod";
import { ProductCategory } from "./product.interface";

// Enum for ProductCategory validation
const ProductCategoryValidationSchema = z.nativeEnum(ProductCategory);

// Common reusable validations
const trimmedString = z.string().trim().min(1, "Field cannot be empty");
const nonNegativeNumber = z.number().nonnegative("Value cannot be negative");

// Schema for TProduct
const addProductSchema = z.object({
  body: z.object({
    image: z.string().url(),
    name: trimmedString,
    brand: trimmedString,
    model: trimmedString,
    price: nonNegativeNumber,
    category: ProductCategoryValidationSchema,
    description: trimmedString,
    quantity: z.number().int().nonnegative("Quantity cannot be negative"),
  }),
});

const updateProductSchema = z.object({
  body: addProductSchema.shape.body.deepPartial(),
});

export const ProductValidationSchema = {
  addProductSchema,
  updateProductSchema,
};
