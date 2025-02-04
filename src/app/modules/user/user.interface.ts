/* eslint-disable no-unused-vars */
import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";
import { TLoginUser } from "../auth/auth.interface";

export type TUserRole = keyof typeof USER_ROLE;

export interface TUser {
  name: string;
  email: string;
  password: string;
  role: TUserRole;
  isActive: boolean;
  deliveryAddress: string;
}

interface IValidateUserOptions {
  payload: TLoginUser;
  checkIsBlocked?: boolean;
  checkIsPasswordMatched?: boolean;
}

// custom methods here
export interface UserModel extends Model<TUser> {
  isUserExistsByEmail(email: string): Promise<TUser>;
  isUserBlocked: (user: TUser) => Promise<void>;
  isPasswordMatched: (user: TUser, password: string) => Promise<void>;
  validateUser: ({
    payload,
    checkIsBlocked,
    checkIsPasswordMatched,
  }: IValidateUserOptions) => Promise<TUser>;
}
