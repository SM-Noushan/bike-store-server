import status from "http-status";
import catchAsync from "../utils/catchAsync";
import { AuthServices } from "./auth.service";
import sendResponse from "../utils/sendResponse";

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "User logged in successfully",
    data: result,
  });
});

const registerUser = catchAsync(async (req, res) => {
  const result = await AuthServices.registerUser(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

const changePassword = catchAsync(async (req, res) => {
  await AuthServices.changePassword(req.user.email, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Password changed successfully",
    data: null,
  });
});

export const AuthController = {
  loginUser,
  registerUser,
  changePassword,
};
