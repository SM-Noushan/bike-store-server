import { z } from "zod";
import { Types } from "mongoose";

// Custom validation for MongoDB ObjectId as a string
const ObjectIdValidationSchema = z
  .string()
  .refine(value => Types.ObjectId.isValid(value), {
    message: "Invalid ProductID format",
  })
  .transform(value => new Types.ObjectId(value));

// Zod schema for TOrder
const OrderValidationSchema = z.object({
  email: z.string().email("Invalid email address").trim(),
  product: ObjectIdValidationSchema,
  quantity: z
    .number()
    .min(1, "Quantity must be at least 1")
    .int("Quantity must be an integer")
    .positive("Quantity must be a positive number"),
  totalPrice: z
    .number()
    .nonnegative("Total price must be a non-negative number"),
});

export default OrderValidationSchema;
