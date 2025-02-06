import express from "express";
import auth from "../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import { ProductControllers } from "./product.controller";
import validateRequest from "../middlewares/validateRequest";
import { ProductValidationSchema } from "./product.validation";

const productRouter = express.Router();

productRouter
  .get("/", ProductControllers.getAllProducts)
  .post(
    "/",
    validateRequest(ProductValidationSchema.addProductSchema),
    auth(USER_ROLE.admin),
    ProductControllers.createProduct,
  );
productRouter
  .get("/:productId", ProductControllers.getSingleProductById)
  .put(
    "/:productId",
    validateRequest(ProductValidationSchema.updateProductSchema),
    auth(USER_ROLE.admin),
    ProductControllers.updateProduct,
  )
  .delete(
    "/:productId",
    auth(USER_ROLE.admin),
    ProductControllers.deleteProduct,
  );

export const ProductRoutes = productRouter;
