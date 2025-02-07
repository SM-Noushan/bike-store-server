import express from "express";
import auth from "../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import { OrderControllers } from "./order.controller";
import { OrderValidationSchema } from "./order.validation";
import validateRequest from "../middlewares/validateRequest";

const orderRouter = express.Router();

// orderRouter.post("/", OrderControllers.createOrder);
// orderRouter.get("/revenue", OrderControllers.totalRevenue);
orderRouter.post(
  "/checkout",
  validateRequest(OrderValidationSchema.CheckoutValidationSchema),
  auth(USER_ROLE.customer, USER_ROLE.admin),
  OrderControllers.checkout,
);

export const OrderRoutes = orderRouter;
