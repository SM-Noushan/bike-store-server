import { User } from "./user.model";
import { Document } from "mongoose";
import { TUser } from "./user.interface";
import validateDoc from "../utils/validateDoc";
import QueryBuilder from "../../builder/QueryBuilder";
import { UserSearchableFields } from "./user.constant";

const getMe = async (email: string) => {
  const result = await User.findOne({ email });
  return result;
};

const getAllUsers = async (query: Record<string, unknown>) => {
  const usersQuery = new QueryBuilder(User.find(), query)
    .search(UserSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await usersQuery.modelQuery;
  const meta = await usersQuery.countTotal();

  return {
    meta,
    result,
  };
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

const updateDeliveryAddress = async (email: string, deliverAddress: string) => {
  const userInfo = (await User.validateUser({
    payload: { email, password: "" },
  })) as unknown as Document & TUser;

  // update delivery address
  userInfo.deliveryAddress = deliverAddress;
  await userInfo.save();

  return { userInfo };
};

export const UserServices = {
  getMe,
  getAllUsers,
  changeStatus,
  updateDeliveryAddress,
};
