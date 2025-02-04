import status from "http-status";
import catchAsync from "../utils/catchAsync";
import { UserServices } from "./user.service";
import sendResponse from "../utils/sendResponse";

const getMe = catchAsync(async (req, res) => {
  const { email } = req.user;
  const result = await UserServices.getMe(email);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "User data retrieved successfully",
    data: result,
  });
});

const getUsers = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUsers();
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Users data retrieved successfully",
    data: result,
  });
});

const changeStatus = catchAsync(async (req, res) => {
  const result = await UserServices.changeStatus(req.params.id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "User status changed successfully",
    data: result,
  });
});

export const userControllers = {
  getMe,
  getUsers,
  changeStatus,
};
