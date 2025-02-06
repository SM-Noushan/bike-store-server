import express from "express";
import auth from "../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import { ProductControllers } from "./product.controller";

const productRouter = express.Router();

productRouter
  .get("/", ProductControllers.getAllProducts)
  .post("/", auth(USER_ROLE.admin), ProductControllers.createProduct);
productRouter
  .get("/:productId", ProductControllers.getSingleProductById)
  .put("/:productId", auth(USER_ROLE.admin), ProductControllers.updateProduct)
  .delete(
    "/:productId",
    auth(USER_ROLE.admin),
    ProductControllers.deleteProduct,
  );

export const ProductRoutes = productRouter;
