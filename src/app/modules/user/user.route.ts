import express from "express";
import auth from "../middlewares/auth";
import { USER_ROLE } from "./user.constant";
import { userControllers } from "./user.controller";
import validateRequest from "../middlewares/validateRequest";
import { UserValidations } from "./user.validation";

const router = express.Router();

router.get("/me", auth(), userControllers.getMe);
router.get("/users", auth(USER_ROLE.admin), userControllers.getUsers);
router.patch(
  "/change-status/:id",
  auth(USER_ROLE.admin),
  userControllers.changeStatus,
);
router.put(
  "/set-delivery-address",
  validateRequest(UserValidations.ChangeDeliveryAddressValidationSchema),
  auth(),
  userControllers.updateDeliverAddress,
);

export const UserRoutes = router;
