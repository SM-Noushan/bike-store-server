import express from "express";
import { OrderControllers } from "./order.controller";

const orderRouter = express.Router();

orderRouter.post("/", OrderControllers.createOrder);

export const OrderRoutes = orderRouter;
