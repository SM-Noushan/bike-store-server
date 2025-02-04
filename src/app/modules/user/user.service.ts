import { User } from "./user.model";
import { Document } from "mongoose";
import { TUser } from "./user.interface";
import validateDoc from "../utils/validateDoc";

const getMe = async (email: string) => {
  const result = await User.findOne({ email });
  return result;
};

const getAllUsers = async () => {
  const result = await User.find();
  return result;
};

const changeStatus = async (id: string) => {
  const user = (await validateDoc({
    model: User,
    query: { _id: id },
    errMsg: "User does not exists",
  })) as TUser & Document;

  user.isActive = !user.isActive;
  await user.save();
  return user;
};

export const UserServices = {
  getMe,
  getAllUsers,
  changeStatus,
};
