import { Router } from "express";
import auth from "../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import { AuthController } from "./auth.controller";
import { AuthValidation } from "./auth.validation";
import validateRequest from "../middlewares/validateRequest";

const router = Router();

router.post(
  "/login",
  validateRequest(AuthValidation.loginValidationSchema),
  AuthController.loginUser,
);
router.post(
  "/register",
  validateRequest(AuthValidation.registerValidationSchema),
  AuthController.registerUser,
);
router.post(
  "/change-password",
  auth(USER_ROLE.admin, USER_ROLE.customer),
  validateRequest(AuthValidation.passwordValidationSchema),
  AuthController.changePassword,
);

export const AuthRoutes = router;
