import config from "../../config";
import { Document } from "mongoose";
import createToken from "./auth.utils";
import { User } from "../user/user.model";
import { TUser } from "../user/user.interface";
import { TLoginUser, TPasswordChange, TRegisterUser } from "./auth.interface";

const loginUser = async (payload: TLoginUser) => {
  // validate user => check if user exists,  is blocked, and password is correct
  const userInfo = await User.validateUser({
    payload,
    checkIsPasswordMatched: true,
  });
  //   create toke and return to client
  const accessToken = createToken(
    userInfo,
    config.jwtSecret as string,
    config.jwtExpiresIn as string,
  );

  return { accessToken };
};

const registerUser = async (payload: TRegisterUser) => {
  const user = await User.create(payload);

  const accessToken = createToken(
    user,
    config.jwtSecret as string,
    config.jwtExpiresIn as string,
  );

  return { accessToken, user };
};

const changePassword = async (email: string, payload: TPasswordChange) => {
  // validate user => check if user exists, is deleted, is blocked, and password is correct
  const userInfo = (await User.validateUser({
    payload: { email, password: payload.currentPassword },
    checkIsPasswordMatched: true,
  })) as unknown as Document & TUser;
  // update password
  userInfo.password = payload.newPassword;
  await userInfo.save();

  return null;
};

export const AuthServices = {
  loginUser,
  registerUser,
  changePassword,
};
