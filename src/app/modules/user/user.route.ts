import express from "express";
import auth from "../middlewares/auth";
import { USER_ROLE } from "./user.constant";
import { userControllers } from "./user.controller";

const router = express.Router();

router.get("/me", userControllers.getMe);
router.get("/users", auth(USER_ROLE.admin), userControllers.getUsers);
router.patch(
  "/change-status/:id",
  auth(USER_ROLE.admin),
  userControllers.changeStatus,
);

export const UserRoutes = router;
