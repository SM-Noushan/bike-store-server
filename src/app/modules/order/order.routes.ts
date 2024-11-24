import express from "express";
import { OrderControllers } from "./order.controller";

const orderRouter = express.Router();

orderRouter.post("/", OrderControllers.createOrder);
orderRouter.get("/revenue", OrderControllers.totalRevenue);

export const OrderRoutes = orderRouter;
