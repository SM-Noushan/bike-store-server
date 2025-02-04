import bcrypt from "bcrypt";
import status from "http-status";
import config from "../../config";
import { model, Schema } from "mongoose";
import AppError from "../errors/AppError";
import validateDoc from "../utils/validateDoc";
import { TUser, UserModel } from "./user.interface";
import { USER_ROLE, UserRoleEnum } from "./user.constant";

const userSchema = new Schema<TUser, UserModel>(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: {
        values: UserRoleEnum,
        message: "{VALUE} is not a valid role",
      },
      default: USER_ROLE.customer,
    },
    deliveryAddress: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  },
);

// hashing password
userSchema.pre("save", async function (next) {
  if (this.password)
    this.password = await bcrypt.hash(
      this.password,
      Number(config.bcryptSaltRounds),
    );
  next();
});

userSchema.post("save", async function (doc, next) {
  if (this.password) doc.password = "🤫";
  next();
});

// custom methods
// check if user exists
userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await validateDoc({
    model: this,
    query: { email },
    errMsg: "User does not exists",
    select: "+password",
  });
};

//  check if user id blocked
userSchema.statics.isUserBlocked = function (userInfo: TUser) {
  if (!userInfo?.isActive)
    throw new AppError(status.FORBIDDEN, "User is blocked");
};

//  check if user password is correct
userSchema.statics.isPasswordMatched = async function (
  userInfo: TUser,
  password: string,
) {
  const isPasswordCorrect = await bcrypt.compare(password, userInfo.password);
  if (!isPasswordCorrect)
    throw new AppError(status.UNAUTHORIZED, "Invalid credentials");
};
// validate user => check if user exists, is blocked, and password is correct
userSchema.statics.validateUser = async function ({
  payload,
  checkIsBlocked = true,
  checkIsPasswordMatched = false,
}) {
  const userInfo = await this.isUserExistsByEmail(payload.email);
  if (checkIsBlocked) this.isUserBlocked(userInfo);
  if (checkIsPasswordMatched)
    await this.isPasswordMatched(userInfo, payload.password);
  return userInfo;
};

export const User = model<TUser, UserModel>("User", userSchema);
