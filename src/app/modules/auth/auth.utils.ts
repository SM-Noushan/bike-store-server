import jwt from "jsonwebtoken";
import { TUser } from "../user/user.interface";

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
    },
  );

export default createToken;
