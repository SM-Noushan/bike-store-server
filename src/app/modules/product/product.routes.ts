import express from "express";
import { ProductControllers } from "./product.controller";

const productRouter = express.Router();

productRouter
  .get("/", ProductControllers.getAllProducts)
  .post("/", ProductControllers.createProduct);

export const ProductRoutes = productRouter;
