import { TUser } from "../user/user.interface";
import jwt, { SignOptions } from "jsonwebtoken";

const createToken = (
  jwtPayload: Pick<TUser, "email" | "role">,
  secret: string,
  expiresIn: string,
): string =>
  jwt.sign(
    {
      email: jwtPayload.email,
      role: jwtPayload.role,
    },
    secret,
    {
      expiresIn,
    } as SignOptions,
  );

export default createToken;
