import express from "express";
import { ProductControllers } from "./product.controller";

const productRouter = express.Router();

productRouter
  .get("/", ProductControllers.getAllProducts)
  .post("/", ProductControllers.createProduct);
productRouter
  .get("/:productId", ProductControllers.getSingleProductById)
  .patch("/:productId", ProductControllers.updateProduct)
  .delete("/:productId", ProductControllers.deleteProduct);

export const ProductRoutes = productRouter;
